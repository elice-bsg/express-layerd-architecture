const {Router} = require('express');
const {userController, userMiddleware} = require('../presentation');

const userRouter = Router();

userRouter.post("/register", userMiddleware.isNotLoggedIn, userMiddleware.checkCreatable("body"), userController.registerUser);
userRouter.post("/login", userMiddleware.isNotLoggedIn, userMiddleware.checkLoginable("body"), userController.login);
userRouter.get("/logout", userMiddleware.isLoggedIn, userController.logout);

module.exports = userRouter;