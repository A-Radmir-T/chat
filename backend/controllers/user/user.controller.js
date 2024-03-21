const mapUser = require('../../helpers/mapUser')
const mapAlbum = require('../../helpers/mapAlbum')
const Album = require('../../models/Album')
const User = require('../../models/User')
const FriendList = require('../../models/FrendList')
const mapFriend = require('../../helpers/mapFriend')
const DialogList = require('../../models/DialogList')
const mapDialog = require('../../helpers/mapDialog')
const _ = require('lodash')
async function searchUsers(req, res) {
   try {
      const search = req.query.search || ''
      let users
      if (search) {
         const firstName = await User.find({
            firstName: { $regex: search, $options: 'i' }
         })
         const lastName = await User.find({
            lastName: { $regex: search, $options: 'i' }
         })
         users = [...firstName, ...lastName].filter(
            user => user.id !== req.userId
         )

         users = _.uniqBy(users, 'id')

         console.log(users)
         res.status(200).send({
            users: users.map(user => mapUser(user))
         })

         return
      }
      users = await User.find()
      users = users.filter(user => user.id !== req.userId)

      res.status(200).send({
         users: users.map(user => mapUser(user))
      })
   } catch (e) {
      console.log(e)
   }
}

async function getUserById(req, res) {
   const id = req.params.id
   const user = await User.findById(id)
   res.status(200).send({
      user: mapUser(user)
   })
}

async function getProfileFriend(req, res) {
   try {
      const id = req.params.id
      const user = await User.findById(id)
      const album = await Album.findOne({ userId: id }).populate({
         path: 'images',
         options: { sort: { createdAt: -1 } }
      })

      const friendList = await FriendList.findOne({ userId: id })
         .populate({
            path: 'users',
            populate: { path: 'receiving' }
         })
         .populate({
            path: 'users',
            populate: { path: 'sender' }
         })

      let currentStatusUser = null
      const friends = friendList.users.map(data => mapFriend(id, data))

      friends.forEach(user => {
         if (user.friendId === req.userId) {
            currentStatusUser = {
               id: user.id,
               senderId: user.senderId,
               isAccepted: user.isAccepted
            }
         }
      })

      res.status(200).send({
         user: mapUser(user),
         album: mapAlbum(album),
         friends,
         currentStatusUser
      })
   } catch (e) {
      res.status(404).send({ error: 'USER_NOT_EXIST' })
   }
}

async function getProfile(req, res) {
   try {
      const id = req.userId
      const user = await User.findById(id)
      const album = await Album.findOne({ userId: id }).populate({
         path: 'images',
         options: { sort: { createdAt: -1 } }
      })

      const friendList = await FriendList.findOne({ userId: id })
         .populate({
            path: 'users',
            populate: { path: 'receiving' }
         })
         .populate({
            path: 'users',
            populate: { path: 'sender' }
         })
      const dialogList = await DialogList.findOne({ userId: id })
         .populate({
            path: 'dialogs',
            populate: { path: 'user_1' }
         })
         .populate({
            path: 'dialogs',
            populate: { path: 'user_2' }
         })
         .populate({
            path: 'dialogs',
            populate: { path: 'message' }
         })

      res.status(200).send({
         user: mapUser(user),
         album: mapAlbum(album),
         friends: friendList.users.map(data => mapFriend(id, data)),
         dialogs: dialogList.dialogs.map(dialog => mapDialog(id, dialog))
      })
   } catch (e) {
      console.log(e)
   }
}

async function editProfile(req, res) {
   try {
      const edited = await User.findByIdAndUpdate(req.userId, req.body, {
         new: true
      })
      res.status(201).send({
         user: mapUser(edited)
      })
   } catch (e) {
      console.log(e)
   }
}

module.exports = {
   searchUsers,
   getProfileFriend,
   getProfile,
   getUserById,
   editProfile
}
