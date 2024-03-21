const mapDialog = require('../../helpers/mapDialog')
const mapMessage = require('../../helpers/mapMessage')
const mapUser = require('../../helpers/mapUser')
const Dialog = require('../../models/Dialog')
const DialogList = require('../../models/DialogList')
const Message = require('../../models/Message')
const User = require('../../models/User')

async function sendMessage(req, res) {
   try {
      const { message } = req.body
      const newMessage = await Message.create({
         ...message,
         senderId: req.userId
      })
      await Dialog.findByIdAndUpdate(message.dialogId, {
         message: [newMessage],
         isRead: false
      })

      res.send({})
   } catch (e) {
      console.log(e)
   }
}

async function deleteDialog(req, res) {
   const { id } = req.params
   const dialog = await Dialog.findByIdAndDelete(id)

   if (dialog.message.length) {
      res.status(204).send()
      return
   }
   await DialogList.findOneAndUpdate(
      { userId: dialog.user_1 },
      { $pull: { dialogs: dialog.id } }
   )
   await DialogList.findOneAndUpdate(
      { userId: dialog.user_2 },
      { $pull: { dialogs: dialog.id } }
   )
   res.status(204).send()
}

async function createDialog(req, res) {
   const { friendId } = req.body
   const userId = req.userId

   if (
      (await Dialog.findOne({
         user_1: userId,
         user_2: friendId
      })) ||
      (await Dialog.findOne({
         user_2: userId,
         user_1: friendId
      }))
   ) {
      console.log('dialog exists')
      res.send({})
      return
   }

   const newDialog = await Dialog.create({
      user_1: req.userId,
      user_2: friendId
   })

   await DialogList.findOneAndUpdate(
      { userId },
      { $push: { dialogs: newDialog } }
   )
   await DialogList.findOneAndUpdate(
      { userId: friendId },
      { $push: { dialogs: newDialog } }
   )

   const dialog = await Dialog.findById(newDialog.id)
      .populate('user_1')
      .populate('user_2')

   res.status(201).send({
      dialog: mapDialog(userId, dialog)
   })
}

async function getMessages(req, res) {
   const { id } = req.params

   const messages = await Message.find({ dialogId: id })

   if (messages.length) {
      res.status(200).send({
         messages: messages.map(message => mapMessage(message))
      })
      return
   }

   res.status(200).send({
      messages: []
   })
}

module.exports = {
   sendMessage,
   getMessages,
   createDialog,
   deleteDialog
}
