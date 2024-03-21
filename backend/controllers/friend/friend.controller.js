const mapFriend = require('../../helpers/mapFriend')
const Friend = require('../../models/Frend')
const FriendList = require('../../models/FrendList')

async function friendRequest(req, res) {
   try {
      const { friendId } = req.body
      const userId = req.userId

      const isExists = await Friend.findOne({ receiving: friendId })

      if (isExists) {
         res.status(204).send({})
         return
      }

      const newFriend = await Friend.create({
         sender: userId,
         receiving: friendId
      })

      await FriendList.findOneAndUpdate(
         { userId },
         { $push: { users: newFriend } }
      )
      await FriendList.findOneAndUpdate(
         { userId: friendId },
         { $push: { users: newFriend } }
      )

      const friend = await Friend.findById(newFriend.id)
         .populate('sender')
         .populate('receiving')

      res.status(200).send({
         friend: mapFriend(userId, friend)
      })
   } catch (e) {
      console.log(e)
   }
}

async function addFriend(req, res) {
   const { id } = req.body

   await Friend.findByIdAndUpdate(id, { isAccepted: true })
   res.status(201).send({})
}

async function deleteFriend(req, res) {
   const { id } = req.params
   const userId = req.userId
   const friend = await Friend.findById(id)
      .populate('sender')
      .populate('receiving')

   if (friend.sender.id === userId) {
      await Friend.findByIdAndUpdate(id, {
         isAccepted: false,
         sender: friend.receiving,
         receiving: userId
      })
   } else {
      await Friend.findByIdAndUpdate(id, { isAccepted: false })
   }

   const newFriend = await Friend.findById(id)
      .populate('sender')
      .populate('receiving')

   res.status(200).send({
      friend: mapFriend(userId, newFriend)
   })
}

async function cancelFriend(req, res) {
   const { id } = req.body
   const friend = await Friend.findByIdAndDelete(id)
   await FriendList.findOneAndUpdate(
      { userId: friend.sender },
      { $pull: { users: friend.id } }
   )
   await FriendList.findOneAndUpdate(
      { userId: friend.receiving },
      { $pull: { users: friend.id } }
   )

   res.status(204).send({})
}
async function getFriends(req, res) {
   const friendList = await FriendList.findOne({ userId: req.userId })
      .populate({
         path: 'users',
         populate: { path: 'receiving' }
      })
      .populate({
         path: 'users',
         populate: { path: 'sender' }
      })

   res.status(200).send({
      friends: friendList.users.map(data => mapFriend(req.userId, data))
   })
}

module.exports = {
   friendRequest,
   addFriend,
   deleteFriend,
   cancelFriend,
   getFriends
}
