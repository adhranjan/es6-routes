import {BaseController} from './base-controller'
import {Resolved} from "../response/root/resolved";

const q = require('q');
const JaySchema = require("jayschema");
const js = new JaySchema();


export class Controller extends BaseController {

    static createResolvedFromObject(resolved) {
        try {
            resolved.getStatusCode();
            resolved.getResponse();
        } catch (e) {
            return new Resolved(resolved)
        }
        return resolved
    }

    validateSchema(schema, data) {
        let deferred = q.defer();
        if (typeof schema !== "undefined") {
            try {
                let validationSchema = require("../" + schema);
            } catch (e) {
                throw new Error(e)
            }


            js.validate(data, validationSchema, function (errs) {
                if (errs) {
                    deferred.reject(errs[0]);
                }
                deferred.resolve(true);
            });
        } else {
            deferred.resolve(true);
        }
        return deferred.promise;
    };
}
