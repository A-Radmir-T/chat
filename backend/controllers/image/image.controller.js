const { saveAvatar, savePicture } = require('./utils/saveImage')
const deleteFile = require('./utils/deleteFile')
const Album = require('../../models/Album')
const Image = require('../../models/Image')
const mapAlbum = require('../../helpers/mapAlbum')
const mapImage = require('../../helpers/mapImage')
const User = require('../../models/User')

async function updateAvatar(req, res) {
   try {
      const userId = req.userId

      const { avatar } = await User.findById(userId)

      if (avatar.path) {
         await deleteFile(avatar.path)
      }

      const { buffer: avatarBuffer } = req.files['avatar'][0]
      const pathAvatar = await saveAvatar(avatarBuffer, req.headers.host)

      const { buffer, originalname } = req.files['picture'][0]
      const { fullSize, smallSize } = await savePicture(
         buffer,
         originalname,
         req.headers.host
      )

      const newImage = await Image.create({
         userId,
         fullSize,
         smallSize
      })

      const newAvatar = { path: pathAvatar, imageId: newImage._id }

      await User.findByIdAndUpdate(userId, { avatar: newAvatar })

      await Album.findOneAndUpdate({ userId }, { $push: { images: newImage } })

      res.status(201).send({
         avatar: newAvatar,
         images: mapImage(newImage)
      })
   } catch (e) {
      res.status(400).send({ error: e.message })
   }
}

async function addImage(req, res) {
   try {
      const userId = req.userId
      const { buffer, originalname } = req.file
      const { fullSize, smallSize } = await savePicture(
         buffer,
         originalname,
         req.headers.host
      )
      const newImage = await Image.create({
         userId,
         fullSize,
         smallSize
      })
      await Album.findOneAndUpdate({ userId }, { $push: { images: newImage } })

      res.status(201).send({
         image: mapImage(newImage)
      })
   } catch (e) {
      res.status(400).send({ error: e.message })
   }
}

async function getAlbum(req, res) {
   try {
      const album = await Album.findOne({ userId: req.userId }).populate({
         path: 'images',
         options: { sort: { createdAt: -1 } }
      })

      res.status(200).send({ album: mapAlbum(album) })
   } catch (e) {
      console.log(e)
   }
}

async function deleteImage(req, res) {
   try {
      const id = req.params.id
      const data = await Image.findByIdAndDelete(id)
      const user = await User.findById(req.userId)
      await Album.findOneAndUpdate(
         { userId: req.userId },
         { $pull: { images: id } }
      )

      if (user.avatar.imageId === id) {
         await User.findByIdAndUpdate(req.userId, {
            avatar: { path: '', imageId: '' }
         })

         await deleteFile(user.avatar.path)
      }

      await deleteFile(data.fullSize)
      await deleteFile(data.smallSize)

      res.status(204).send({})
   } catch (e) {
      console.log(e)
   }
}

async function deleteAvatar(req, res) {
   try {
      const user = await User.findByIdAndUpdate(req.userId, {
         avatar: { path: '', imageId: '' }
      })

      if (user.avatar.path) {
         await deleteFile(user.avatar.path)
      }

      res.status(204).send({})
   } catch (e) {
      console.log(e)
   }
}

module.exports = {
   addImage,
   updateAvatar,
   getAlbum,
   deleteImage,
   deleteAvatar
}
