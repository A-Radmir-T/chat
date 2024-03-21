const mongoose = require('mongoose')

const AlbumSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   images: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Image'
      }
   ]
})

const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album
