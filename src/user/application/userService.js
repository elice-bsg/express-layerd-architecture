const { userDao } = require('../domain');

const userService = {
    async createUser({username, password, email}) {
        const createdUser = await userDao.create({
            username,
            password,
            email
        });

        return createdUser;
    },

    async findUserByUsername(username) {
        const foundUser = await userDao.findByUsername(username);

        return foundUser;
    },

    async findUserById(id) {
        const foundUser = await userDao.findById(id);

        return foundUser;
    }
};

module.exports = userService;