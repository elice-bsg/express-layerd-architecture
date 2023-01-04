const Sequelize = require('sequelize');
const User = require('../user/domain/User');
const Board = require('../board/domain/Board');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Board = Board;

User.initiate(sequelize);
Board.initiate(sequelize);

User.associate(db);
Board.associate(db);

module.exports = db;