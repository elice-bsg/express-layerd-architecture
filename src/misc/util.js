/**
 * buildResponse : client response의 공통 인터페이스 정의
 * @param data
 * @param errorMessage
 * @returns {{data, error: null}}
 */
const buildResponse = (data, errorMessage) => {
    return {
        error: errorMessage ?? null,
        data: data
    }
}

module.exports = {
    buildResponse
};