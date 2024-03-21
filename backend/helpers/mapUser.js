module.exports = function (user) {
   return {
      id: user.id,
      email: user.email,
      registeredAt: user.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
   }
}
