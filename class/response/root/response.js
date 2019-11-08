class Response {
    constructor(statusCode) {
        this.statusCode = statusCode;
    }

    send(response) {
        return (body) => {
            response.status(this.statusCode).send(body);
        };
    }
}

module.exports = Response;
