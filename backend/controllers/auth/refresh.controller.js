const { refreshToken, verifyToken } = require('../../helpers/token')
const refreshKey = process.env.REFRESH_TOKEN_SECRET_KEY

async function refreshUser(req, res) {
   try {
      const { refreshToken: token } = req.cookies
      const verifyResult = verifyToken(token, refreshKey)
      if (!token && !verifyResult) {
         res.status(401).send({ error: 'UNAUTHORIZED' })
      }

      const refreshData = refreshToken(token, refreshKey)

      res.cookie('refreshToken', refreshData.refreshToken, {
         httpOnly: true,
         maxAge: 30 * 24 * 60 * 60 * 1000
      }).send({
         error: null,
         accessToken: refreshData.accessToken,
         expiresIn: 3600
      })
   } catch (e) {
      res.status(401).send({ error: e.message })
   }
}

module.exports = refreshUser
