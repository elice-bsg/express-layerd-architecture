const utils = require('../../../misc/util');
const {userService} = require('../../application');

const userController = {
    async registerUser(req, res, next) {
        try {
            const {username, password, email} = req.body;
            const createdUser = await userService.createUser({username, password, email});

            const responseBody = utils.buildResponse(createdUser);
            res.status(201).json(responseBody);
        } catch(error) {
            next(error);
        }
    }
};

module.exports = userController;