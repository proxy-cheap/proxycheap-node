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

exports.BaseError = BaseError;

exports.FatalError = class FatalError extends BaseError {
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
};

exports.APIError = class APIError extends BaseError {
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
    }
};