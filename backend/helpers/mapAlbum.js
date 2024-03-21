const mapImage = require('./mapImage')

module.exports = function (album) {
   return {
      images: album.images.map(image => mapImage(image))
   }
}
