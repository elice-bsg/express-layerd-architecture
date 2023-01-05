const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {userService} = require('../../../application/index');

async function verifyUser(username, password, done) {
    try {
        const exUser = await userService.findUserByUsername(username);

        if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);

            if (result) {
                done(null, exUser);
            } else {
                done(null, false, { message: '아이디 혹은 비밀번호가 일치하지 않습니다' });
            }
        } else {
            done(null, false, { message: '존재하지 않는 회원입니다. '});
        }
    } catch(error) {
        console.error(error);
        done(error);
    }
}

function setPassport() {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: false
    }, verifyUser));
}

module.exports = setPassport;