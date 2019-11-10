const Response = require('./root/response');

class SuccessResponse extends Response {
    constructor(code) {
        super(code === undefined ? 200 : Number(code));
    }
}

module.exports = SuccessResponse;
