const mapDialog = require('../../helpers/mapDialog')
const mapMessage = require('../../helpers/mapMessage')
const Dialog = require('../../models/Dialog')
const DialogList = require('../../models/DialogList')
const Message = require('../../models/Message')
const handleError = require('../../utils/handleError')

module.exports = async function (io, socket) {
   socket.on('message:read', async ({ unreadMessageId, friendId }) => {
      const message = await Message.findByIdAndUpdate(unreadMessageId, {
         isRead: true
      }).populate('senderId')

      io.to(friendId).emit('message:update', {
         messageId: message.id
      })
   })

   socket.on('message:send', async ({ friendId, message }) => {
      try {
         const newMessage = await Message.create({
            ...message,
            senderId: socket.userId
         })
         const dialog = await Dialog.findByIdAndUpdate(
            message.dialogId,
            {
               message: [newMessage],
               isRead: false
            },
            { new: true }
         )
            .populate('user_1')
            .populate('user_2')
            .populate('message')

         io.to(friendId).emit('dialog:update', {
            ...mapDialog(friendId, dialog)
         })
         io.to(message.dialogId).emit('message:receive', mapMessage(newMessage))
      } catch (e) {
         handleError
      }
   })
}
