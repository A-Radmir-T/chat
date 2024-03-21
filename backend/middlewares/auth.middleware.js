const User = require('../models/User')
const { verifyToken } = require('../helpers/token')

const accessSecret = process.env.ACCESS_TOKEN_SECRET_KEY

async function protect(req, res, next) {
   try {
      if (req.headers.authorization?.startsWith('Bearer')) {
         token = req.headers.authorization.split(' ')[1]
         const verifyResult = verifyToken(token, accessSecret)

         const user = await User.findOne({ _id: verifyResult.id })

         if (!user) {
            res.status(401).send({ error: 'Authenticated user not found' })
            return
         }

         req.user = user.email
         req.userId = user.id
         next()
      } else {
         next()
      }
   } catch (e) {
      res.status(401).send({ error: e.message })
   }
}

module.exports = protect
