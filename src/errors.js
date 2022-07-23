class BaseError extends Error {
    /**
     * @class BaseError
     * @constructor
     * @private
     * @param {String} type Error type
     * @param {String} message Error message
     */
    constructor(type, message) {
        super(message);
        this.type = type;
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
        };
    }
}

class FatalError extends BaseError {
    /**
     * Represents a fatal error from the Client : `"FatalError"`.
     * @extends BaseError
     * @constructor
     * @param {String|Error} error Error object or message
     */
    constructor(error) {
        const errObject = typeof error == "string" ? null : error;
        const message = errObject ? errObject.message : error;
        super("FatalError", message);
        if (errObject) {
            this.stack = errObject.stack;
        }
    }
}

class APIError extends BaseError {
    /**
     * Represents an error from the API : `"APIError"`.
     * @extends BaseError
     * @constructor
     * @param {String|Error} error Error message
     * @param {Object} response Error response
     * @param {String} status Status type of the request
     * @param {String} method Method used for the request
     * @param {String} url Url of the request to the endpoint
     */
    constructor(error, response, status, method, url) {
        const errObject = typeof error == "string" ? null : error;
        const message = errObject ? errObject.message : error;
        super("APIError", message);
        this.status = status;
        this.method = method;
        this.url = url;
        this.data = response.data;
    }
}

class ParseError extends BaseError {
    /**
     * Represents a parsing error : `"ParseError"`.
     * @extends BaseError
     * @constructor
     * @param {String} message error message
     * @param {String} status status type of the request
     * @param {String} method method used for the request
     * @param {String} url url of the request to the endpoint
     */
    constructor(message, status, method, url) {
        super("ParseError", message);

        /**
         * status type of the request
         * @type {string}
         */
        this.status = status;

        /**
         * method used for the request
         * @type {string}
         */
        this.method = method;

        /**
         * url of the request to the endpoint
         * @type {string}
         */
        this.url = url;
    }
}

module.exports = { FatalError, APIError, ParseError };
