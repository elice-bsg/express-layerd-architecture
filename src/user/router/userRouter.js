const {Router} = require('express');
const {userController, userMiddleware} = require('../presentation');

const userRouter = Router();

userRouter.post("/", userMiddleware.checkCreatable("body"), userController.registerUser);

module.exports = userRouter;