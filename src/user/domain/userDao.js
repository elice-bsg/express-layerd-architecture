const User = require('./User');

const userDao = {
    async create({username, password, email}) {
        const newUser = new User({username, password, email});
        const result = await newUser.save();

        return result;
    }
};

module.exports = userDao;