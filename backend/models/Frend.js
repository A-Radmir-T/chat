const mongoose = require('mongoose')

const FriendSchema = mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      receiving: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      isAccepted: {
         type: Boolean,
         default: false
      }
   },
   { timestamps: true }
)

const Friend = mongoose.model('Friend', FriendSchema)

module.exports = Friend
