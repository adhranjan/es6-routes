const Response = require('./root/response');

class SuccessRespnse extends Response {
    constructor() {
        super(200)
    }
}

module.exports = SuccessRespnse;
