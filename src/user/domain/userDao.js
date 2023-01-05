const User = require('./User');

const userDao = {
    async create({username, password, email}) {
        const newUser = new User({username, password, email});
        const result = await newUser.save();

        return result;
    },

    async findByUsername(username) {
        const foundUser = await User.findOne({
            where: {username}
        });

        return foundUser;
    },

    async findById(id) {
        const foundUser = await User.findByPk(id);

        return foundUser;
    }
};

module.exports = userDao;