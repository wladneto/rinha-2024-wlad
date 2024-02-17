const { Sequelize } = require('sequelize');
const dbConfig  = require('./src/config/config')


const DB_NAME = process.env.DB_NAME || 'rinha';
// const DB_USER = process.env.DB_USER || 'user';
// const DB_PASS = process.env.DB_PASS || 'password';
// const DB_HOST = process.env.DB_HOST || 'localhost';


// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//     host: DB_HOST,
//     dialect: 'mysql',
//     logging: false
// });


const conf = dbConfig.development;

const sequelize = new Sequelize(
  conf.database,
  conf.username,
  conf.password,
  {
    host: conf.host,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: 0
  }
);

sequelize.sync();

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log(`Database connection with "${DB_NAME}" has been established successfully.`)
    } catch (error) {
        console.log (`Error to connect to the database "${DB_NAME}".`)
    }
}

connect();