/**
 * commonErrors : global error를 정의하는 객체
 * @type {{resourceDuplicationError: string, fatalError: string, inputError: string, authenticationError: string, resourceNotFoundError: string, authorizationError: string, databaseError: string, businessError: string, remoteStorageError: string, argumentError: string, configError: string, objectCreationError: string, requestValidationError: string}}
 */
const commonErrors = {
    authenticationError: `Authentication Error`,
    authorizationError: `Authorization Error`,
    inputError: `Input Error`,
    argumentError: `Argument Error`,
    businessError: `Business Error`,
    configError: `Config Error`,
    databaseError: `DB Error`,
    fatalError: `Fatal Error`,
    objectCreationError: `Object Creation Error`,
    resourceNotFoundError: `Resource Not Found Error`,
    resourceDuplicationError: `Resource Duplication Error`,
    remoteStorageError: `Remote Storage Error`,
    requestValidationError: `Request Validation Error`,
};

module.exports = commonErrors;