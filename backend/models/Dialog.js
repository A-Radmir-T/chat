const mongoose = require('mongoose')

const DialogSchema = mongoose.Schema({
   user_1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   user_2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   message: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Message'
      }
   ],
   isRead: {
      type: Boolean,
      default: true
   }
})

const Dialog = mongoose.model('Dialog', DialogSchema)

module.exports = Dialog
