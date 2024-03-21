const mongoose = require('mongoose')

const FriendListSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   users: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Friend',
         required: true
      }
   ]
})

const FriendList = mongoose.model('FriendList', FriendListSchema)

module.exports = FriendList
