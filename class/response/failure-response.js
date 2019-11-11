import {Response} from './root/response';

export class FailureResponse extends Response {
    constructor(code) {
        super(code === undefined ? 500 : Number(code));
    }
}
