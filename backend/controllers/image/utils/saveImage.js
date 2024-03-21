const fs = require('fs')
const sharp = require('sharp')
const pathImage = process.env.PUTH_IMAGE
const path = require('path')
const { UPLOADS_PATH, HTTP } = require('../../../constants')

module.exports = {
   async saveAvatar(buffer, host) {
      const name = 'avatar'
      fs.access(UPLOADS_PATH, error => {
         if (error) {
            fs.mkdirSync(UPLOADS_PATH)
         }
      })
      const timestamp = Date.now()
      const ref = `${timestamp}-${name}.webp`

      await sharp(buffer).resize(350).toFile(path.join(UPLOADS_PATH, ref))
      return `${HTTP}${host}/${ref}`
   },

   async savePicture(buffer, name, host) {
      fs.access(UPLOADS_PATH, error => {
         if (error) {
            fs.mkdirSync(UPLOADS_PATH)
         }
      })

      let timestamp = Date.now()
      let ref = `${timestamp}-${name}.webp`

      await sharp(buffer, { failOnError: false })
         .rotate()
         .webp({ quality: 40 })
         .toFile(path.join(UPLOADS_PATH, ref))

      const fullSize = `${HTTP}${host}/${ref}`

      timestamp = Date.now()
      ref = `${timestamp}-${name}.webp`

      await sharp(buffer, { failOnError: false })
         .rotate()
         .resize(600)

         .toFile(path.join(UPLOADS_PATH, ref))

      const smallSize = `${HTTP}${host}/${ref}`
      return {
         fullSize,
         smallSize
      }
   }
}
