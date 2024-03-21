const path = require('path')
const fs = require('fs/promises')
const { UPLOADS_PATH } = require('../../../constants')

module.exports = async function (filePath) {
   const fileName = filePath.split('/').at(-1)
   await fs.unlink(path.join(UPLOADS_PATH, fileName))
}
