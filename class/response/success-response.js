import {Response} from './root/response';

export class SuccessResponse extends Response {
    constructor(code) {
        super(code === undefined ? 200 : Number(code));
    }
}
