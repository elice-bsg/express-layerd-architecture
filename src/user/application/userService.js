const { userDao } = require('../domain');

const userService = {
    async createUser({username, password, email}) {
        const createdUser = await userDao.create({
            username,
            password,
            email
        });

        return createdUser;
    }
};

module.exports = userService;