const mongoose = require('mongoose')

const DialogListSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   dialogs: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Dialog'
      }
   ]
})

const DialogList = mongoose.model('DialogList', DialogListSchema)

module.exports = DialogList
