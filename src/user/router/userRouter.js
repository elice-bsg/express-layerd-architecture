const {Router} = require('express');
const {userController, userMiddleware} = require('../presentation');

const userRouter = Router();

userRouter.post("/register", userMiddleware.isNotLoggedIn, userMiddleware.checkCreatable("body"), userController.registerUser);
userRouter.post("/login", userMiddleware.isNotLoggedIn, userMiddleware.checkLogginable("body"), userController.login);

module.exports = userRouter;