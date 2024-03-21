const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema(
   {
      dialogId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Dialog',
         required: true
      },
      senderId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      text: {
         type: String,
         required: true
      },
      isRead: {
         type: Boolean,
         default: false
      },
      publishedAt: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
)

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
