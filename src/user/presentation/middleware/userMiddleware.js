const AppError = require('../../../misc/AppError');
const commonErrors = require('../../../misc/commonErrors');

const checkCreatable = (from) => (req, res, next) => {
    const {username, password, email} = req[from];

    if (username === undefined) {
        next(
            new AppError(
                commonErrors.inputError,
                400,
                `${from}: username은 필수값입니다.`
            )
        );
    }

    if (password === undefined) {
        next(
            new AppError(
                commonErrors.inputError,
                400,
                `${from}: password는 필수값입니다.`
            )
        );
    }

    if (password.length < 8) {
        next(
            new AppError(
                commonErrors.inputError,
                400,
                `${from}: password는 8자 이상으로 설정해야합니다.`
            )
        );
    }

    if (email === undefined) {
        next(
            new AppError(
                commonErrors,
                400,
                `${from}: email은 필수값입니다.`
            )
        );
    }

    next();
};

module.exports = {
    checkCreatable
};