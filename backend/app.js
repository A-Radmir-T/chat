require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const { Server } = require('socket.io')
const { createServer } = require('http')
const {
   addImage,
   updateAvatar,
   getAlbum,
   deleteImage,
   deleteAvatar
} = require('./controllers/image/image.controller')
const {
   loginUser,
   registerUser
} = require('./controllers/auth/auth.controller')
const {
   searchUsers,
   getProfileFriend,
   getProfile,
   getUserById,
   editProfile
} = require('./controllers/user/user.controller')

const {
   sendMessage,
   getMessages,
   createDialog,
   deleteDialog
} = require('./controllers/message/message.controller')
const refreshUser = require('./controllers/auth/refresh.controller')
const protect = require('./middlewares/auth.middleware')
const {
   getFriends,
   friendRequest,
   addFriend,
   deleteFriend,
   cancelFriend
} = require('./controllers/friend/friend.controller')
const onConnection = require('./socket_io/onConnection')

const port = 3001
const app = express()

app.use(express.static('../frontend/build'))
app.use(express.static('./uploads'))

const storage = multer.memoryStorage()
const upload = multer({ storage })

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.post('/register', registerUser)

app.post('/login', loginUser)
app.get('/refresh', refreshUser)

app.post('/logout', (req, res) => {
   res.cookie('refreshToken', '', { httpOnly: true }).send({})
})
app.use(protect)

const cpUpload = upload.fields([
   { name: 'avatar', maxCount: 1 },
   { name: 'picture', maxCount: 1 }
])
app.post('/upload/avatar', cpUpload, updateAvatar)

app.post('/upload/image', upload.single('picture'), addImage)

app.delete('/upload/image/:id', deleteImage)

app.delete('/upload/avatar', deleteAvatar)

app.get('/album', getAlbum)

app.get('/users', searchUsers)
app.get('/profile/:id', getProfileFriend)
app.patch('/edit', editProfile)
app.get('/user/:id', getUserById)
app.get('/profile', getProfile)
app.get('/friend', getFriends)
app.post('/friends/request', friendRequest)
app.put('/friends/add', addFriend)
app.delete('/friends/:id', deleteFriend)
app.put('/friends/cancel', cancelFriend)
app.post('/message', sendMessage)
app.post('/dialogs', createDialog)
app.get('/msgs/:id', getMessages)
app.delete('/dialogs/:id', deleteDialog)
const server = createServer(app)

app.use('/*', express.static('../frontend/build'))
const io = new Server(server, {
   connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true
   },
   credentials: true,
   cors: '*',
   serveClient: false
})

io.on('connection', socket => {
   onConnection(io, socket)
})

mongoose.connect(process.env.DB_URL).then(() => {
   server.listen(port, () => {
      console.log(`Server started on port ${port}`)
   })
})
