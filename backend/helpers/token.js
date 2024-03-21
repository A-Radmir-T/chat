const jwt = require('jsonwebtoken')

const accessKey = process.env.ACCESS_TOKEN_SECRET_KEY
const refreshKey = process.env.REFRESH_TOKEN_SECRET_KEY

function generateToken(data) {
   const accessToken = jwt.sign(data, accessKey, { expiresIn: '1h' })
   const refreshToken = jwt.sign(data, refreshKey, { expiresIn: '30d' })

   return { accessToken, refreshToken }
}

function verifyToken(token, sign) {
   if (!token) {
      throw new Error('Invalid token')
   }
   return jwt.verify(token, sign)
}

function refreshToken(refreshToken) {
   const { id } = jwt.decode(refreshToken)
   return generateToken({ id })
}

module.exports = {
   generateToken,
   verifyToken,
   refreshToken
}
