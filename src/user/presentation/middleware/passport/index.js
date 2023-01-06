const passport = require('passport');

const local = require('./localStrategy');
const {userService} = require('../../../application');

function passportConfig() {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userService.findUserById(id)
            .then(user => done(null, user))
            .catch(error => done(error));
    });

    local();
}

module.exports = passportConfig