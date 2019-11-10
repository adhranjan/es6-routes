export class Resolved {

    /**
     * Creates a resolve value for api response
     * @param response
     * @param (statusCode) (optional)
     */

    constructor(response, statusCode) {
        this.statusCode = statusCode;
        this.responseData = response;
    }

    getStatusCode() {
        return this.statusCode;
    }

    getResponse() {
        return this.responseData;
    }

}
