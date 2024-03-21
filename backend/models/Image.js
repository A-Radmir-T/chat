const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true
      },
      fullSize: {
         type: String,
         required: true
      },
      smallSize: {
         type: String,
         required: true
      }
   },
   { timestamps: true }
)

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image
