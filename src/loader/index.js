const redis = require('redis');

const {sequelize} = require('./db');

async function connectMySql() {
    try {
        await sequelize.sync({force: false});
        console.log("데이터베이스 연결 성공");
    } catch (err) {
        console.error(err);
    }
}

async function disconnectMySql() {
    try {
        await sequelize.close();
        console.log("데이터베이스 연결 해제 성공");
    } catch (err) {
        console.error(err);
    }
}

async function getRedisClient() {
    const redisClient = redis.createClient({legacyMode: true});
    try {
        await redisClient.connect();
        console.log("Redis에 연결 성공");
        return redisClient;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    connectMySql,
    disconnectMySql,
    getRedisClient
};