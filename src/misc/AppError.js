/**
 * AppError : app 전반에 일어나는 에러를 처리하는 클래스
 * @param name
 * @param httpCode
 * @param description
 */
class AppError extends Error {
    constructor(name, httpCode, description) {
        super(description);

        this.name = name;
        this.httpCode = httpCode;

        Error.captureStackTrace(this);
    }
}

module.exports = AppError;