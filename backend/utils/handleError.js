module.exports = function (err, req, res, next) {
   console.log('handleError:', err)

   if (res) {
      const status = err.status || err.statusCode || 500
      const message = err.message || 'Something went wrong. Try again later'
      res.status(status).json({ message })
   }
}
