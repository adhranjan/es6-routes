import {BaseController} from './base-controller'
import {Resolved} from "../response/root/resolved";

const q = require('q');
const JaySchema = require("jayschema");
const js = new JaySchema();


export class Controller extends BaseController {

    static createResolvedFromObject(resolved) {
        try {
            resolved.getStatusCode() && resolved.getResponse();
        } catch (e) {
            return new Resolved(resolved)
        }
        return resolved
    }

    validateSchema(schema, data) {
        return new Promise((resolve, reject) => {
            if (typeof schema !== "undefined") {
                let validationSchema
                try {
                    validationSchema = require("../" + schema);
                } catch (e) {
                    throw new Error(e)
                }
                js.validate(data, validationSchema, function (errs) {
                    if (errs) {
                        reject(errs[0]);
                    }
                    resolve();
                });
            } else {
                resolve();
            }

        })
    };
}
