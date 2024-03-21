module.exports = function (message) {
   return {
      id: message.id,
      dialogId: message.dialogId,
      senderId: message.senderId,
      text: message.text,
      isRead: message.isRead,
      publishedAt: message.publishedAt
   }
}
