const bcrypt = require('bcrypt')
const User = require('../../models/User')
const Album = require('../../models/Album')
const { generateToken } = require('../../helpers/token')
const mapUser = require('../../helpers/mapUser')
const FriendList = require('../../models/FrendList')
const DialogList = require('../../models/DialogList')

async function registerUser(req, res) {
   try {
      const { email, password, firstName, lastName } = req.body
      if (!password) {
         throw new Error('Password is empty')
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const user = await User.create({
         email,
         password: passwordHash,
         firstName,
         lastName
      })

      await Album.create({
         userId: user.id
      })

      await FriendList.create({
         userId: user.id
      })

      await DialogList.create({
         userId: user.id
      })

      const { accessToken, refreshToken } = generateToken({ id: user.id })

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 30 * 24 * 60 * 60 * 1000
      }).send({
         error: null,
         user: mapUser(user),
         accessToken,
         expiresIn: 3600
      })
   } catch (e) {
      if (e.message.includes('11000')) {
         res.status(400).send({ error: 'EMAIL_EXISTS' })
         return
      }
      if (e) res.status(400).send({ error: e.message })
   }
}

async function loginUser(req, res) {
   try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
         throw new Error('USER_NOT_FOUND')
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) {
         throw new Error('INVALID_PASSWORD')
      }

      const { accessToken, refreshToken } = generateToken({ id: user.id })

      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 30 * 24 * 60 * 60 * 1000
      }).send({
         error: null,
         user: mapUser(user),
         accessToken,
         expiresIn: 3600
      })
   } catch (e) {
      res.status(401).send({ error: e.message })
   }
}

module.exports = {
   loginUser,
   registerUser
}
