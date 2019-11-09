const Response = require('./root/response');

class SuccessResponse extends Response {
    constructor() {
        super(200)
    }
}

module.exports = SuccessResponse;
