import {Response} from './root/response';

export class FailureResponse extends Response {
    constructor() {
        super(500)
    }
}
