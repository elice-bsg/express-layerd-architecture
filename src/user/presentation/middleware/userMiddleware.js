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
                commonErrors.inputError,
                400,
                `${from}: email은 필수값입니다.`
            )
        );
    }

    next();
};

const checkLogginable = (from) => (req, res, next) => {
    const {username, password} = req[from];

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
};

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(
            new AppError(
                commonErrors.authenticationError,
                403,
                "로그인이 필요합니다."
            )
        );
    }
};

const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        next(
            new AppError(
                commonErrors.authenticationError,
                403,
                "로그인한 상태입니다."
            )
        );
    }
};

module.exports = {
    checkCreatable,
    checkLogginable,
    isLoggedIn,
    isNotLoggedIn
};