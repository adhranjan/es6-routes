const Response = require('./root/response');

class FailureResponse extends Response {
    constructor() {
        super(500)
    }
}

module.exports = FailureResponse;
