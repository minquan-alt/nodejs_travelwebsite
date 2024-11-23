const bcrypt = require('bcrypt')

async function hashPassword(password) {
    const genSalt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, genSalt)
}

module.exports = hashPassword
