module.exports = function (image) {
   return {
      id: image._id,
      fullSize: image.fullSize,
      smallSize: image.smallSize,
      publisedAt: image.createdAt
   }
}
