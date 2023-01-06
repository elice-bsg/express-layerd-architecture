const http = require("http");
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const loader = require('./loader');
const config = require('./config');
const passportConfig = require('./user/presentation/middleware/passport');
const AppError = require('./misc/AppError');
const commonErrors = require('./misc/commonErrors');
const utils = require('./misc/util');

const {userRouter} = require('./user/router');

async function createApp() {
    // mySql에 연결
    await loader.connectMySql();

    // MongoDB에 연결
    await loader.connectMongoDB();

    console.log("express application을 초기화합니다.");
    const expressApp = express();

    const db = mongoose.connection;

    expressApp.use(cookieParser());
    passportConfig();
    expressApp.use(session({
        secret: 'example!',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: db.client.s.url}),
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 4,
        }
    }));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());

    // routing
    expressApp.use(express.json());

    // for HeartBeat
    expressApp.get("/health", (req, res) => {
        res.json({
            status: "OK"
        });
    });

    // api router 등록
    expressApp.use("/api/v1/users", userRouter);

    // api Router에 해당하는 요청 외에 들어온 경우 처리
    expressApp.use((req, res, next) => {
        // 에러 전달
        next(
            new AppError(
                commonErrors.resourceNotFoundError,
                404,
                "Resource Not Found"
            )
        );
    });

    // Error Handler
    expressApp.use((error, req, res, next) => {
        console.log(error);
        res.statusCode = error.httpCode ?? 500;
        res.json({
            data: null,
            message: error.message
        });
    });

    // express와 httpServer를 분리 관리
    const server = http.createServer(expressApp);

    const app = {
        start() {
            server.listen(config.port);
            server.on("listening", () => {
                console.log(`🚀 게시판 서버가 포트 ${config.port}에서 운영중입니다.`);
            });
        },
        stop() {
            console.log("🔥 서버를 중지 작업을 시작합니다.");
            this.isShuttingDown = true;
            return new Promise((resolve, reject) => {
                server.close(async (error) => {
                    if (error !== undefined) {
                        console.log(`- HTTP 서버 중지를 실패하였습니다: ${error.message}`);
                        reject(error);
                    }
                    console.log("- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.");
                    await loader.disconnectMySql();
                    await loader.disconnectMongoDB();
                    console.log("- DB 커넥션을 정상적으로 끊었습니다.");
                    console.log("🟢 서버 중지 작업을 성공적으로 마쳤습니다.");
                    this.isShuttingDown = false;
                    resolve();
                });
            });
        },
        isShuttingDown: false,
        _app: expressApp
    };

    return app;
}

module.exports = createApp;