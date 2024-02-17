const { Sequelize } = require('sequelize');
const dbConfig  = require('./src/config/config')


const DB_NAME = process.env.DB_NAME || 'rinha';

const conf = dbConfig.development;

const sequelize = new Sequelize(
  conf.database,
  conf.username,
  conf.password,
  {
    host: conf.host,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: 0,
    pool: {
      max: 20,
      min: 5
    }
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