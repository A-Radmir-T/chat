const mapMessage = require('./mapMessage')
const mapUser = require('./mapUser')

module.exports = function (userId, dialogData) {
   let isRead = true
   const user =
      userId === dialogData.user_1.id ? dialogData.user_2 : dialogData.user_1
   if (dialogData.message.length) {
      isRead =
         dialogData.message[0].senderId === userId
            ? isRead
            : dialogData.message[0].isRead
   }

   return {
      id: dialogData.id,
      user: mapUser(user),
      message: dialogData.message[0] ? mapMessage(dialogData.message[0]) : {},
      isRead
   }
}
