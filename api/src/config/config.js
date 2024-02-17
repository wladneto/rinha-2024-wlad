require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'rinha',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'rinha',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USER || 'user',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'rinha',
    host: process.env.DB_HOST || 'localhost',
    dialect: "mysql"
  }
}