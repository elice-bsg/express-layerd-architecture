const bcrypt = require('bcrypt');
const passport = require('passport');

const utils = require('../../../misc/util');
const AppError = require('../../../misc/AppError');
const commonErrors = require('../../../misc/commonErrors');
const {userService} = require('../../application');

const userController = {
    async registerUser(req, res, next) {
        try {
            const {username, password, email} = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const requestUser = {
                username,
                password: hashedPassword,
                email
            };
            const createdUser = await userService.createUser(requestUser);

            const responseBody = utils.buildResponse(createdUser);
            res.status(201).json(responseBody);
        } catch(error) {
            next(error);
        }
    },

    async login(req, res, next) {
        passport.authenticate('local', (authError, user, message) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }

            if (!user) {
                return next(
                    new AppError(
                        commonErrors.authenticationError,
                        400,
                        '로그인에 실패했습니다.'
                    )
                );
            }

            return req.login(user, (loginError) => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }

                const responseBody = utils.buildResponse(user);
                return res.status(200).json(responseBody);
            })
        })(req, res, next);
    }
};

module.exports = userController;