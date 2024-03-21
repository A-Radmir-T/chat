const DialogList = require('../models/DialogList')
const messageHandlers = require('./handlers/message.handlers')

module.exports = async function (io, socket) {
   const { userId } = socket.handshake.query

   if (userId) {
      socket.userId = userId

      socket.join(userId)

      socket.on('room:connect', roomId => {
         socket.roomId = roomId
         socket.join(roomId)
      })

      messageHandlers(io, socket)
   }
}
