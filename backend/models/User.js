const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true
      },
      password: {
         type: String,
         required: true
      },
      firstName: {
         type: String,
         required: true
      },
      lastName: {
         type: String,
         required: true
      },
      avatar: {
         path: {
            type: String,
            default: ''
         },
         imageId: {
            type: String,
            default: ''
         }
      }
   },
   { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
