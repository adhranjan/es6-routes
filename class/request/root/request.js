export class Request {
    constructor(query, params, body) {
        this.query = query;
        this.params = params;
        this.body = body;
    }

    query() {
        return this.query;
    }

    params() {
        return this.params;
    }

    body() {
        return this.body;
    }

    get() {
        return {
            body: this.body,
            params: this.params,
            query: this.query,
        }
    }
}
