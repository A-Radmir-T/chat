module.exports = function (userId, friendData) {
   const data =
      userId === friendData.sender.id ? friendData.receiving : friendData.sender

   return {
      id: friendData.id,
      senderId: friendData.sender.id,
      isAccepted: friendData.isAccepted,
      friendId: data.id,
      avatar: data.avatar,
      firstName: data.firstName,
      lastName: data.lastName
   }
}
