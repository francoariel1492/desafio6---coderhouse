require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  db: {
    userDb: process.env.USER_DB || 'admin',
    passDb: process.env.PASS_DB || 'admin'
  }
}

module.exports = config