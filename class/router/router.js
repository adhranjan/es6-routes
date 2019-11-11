import {Controller} from '../library/Controller';
import {SuccessResponse} from '../response/success-response';
import {FailureResponse} from '../response/failure-response';
import {Request} from '../request/root/request';

export class Router extends Controller {

    constructor(routes, options) {
        super();
        this.routes = routes;
        this.options = options;
    }

    static loadParams(req) {
        return new Promise(function (resolve, reject) {
                try {
                    let query = Controller.parseJsonArray(req.query);
                    let params = Controller.parseJsonArray(req.params);
                    let body = Controller.parseJsonArray(req.body);
                    resolve(new Request(query, params, body));
                } catch (e) {
                    reject(e)
                }
            }
        );
    };


    action(action) {
        if (typeof action !== "function") {
            throw new Error("Invalid Action: \n" + action);
        }
        let stack = [];
        let apiAction = (req, res, next) => {

            let option = this.options[action.name];
            if (!option) {
                option = {}
            }
            this.authenticate(option.auth, req)
                .then().Router.loadParams(req).then(() => {
                    return this.validateSchema(option.schema, {
                        ...req.body,
                        ...req.query,
                        ...req.params,
                    })
                }
            ).then(function (request) {
                return action(request)
            }).then((resolved) => {
                resolved = Controller.createResolvedFromObject(resolved);
                new SuccessResponse(resolved.getStatusCode()).send(res)(resolved.getResponse())
            }).catch((rejected) => {
                rejected = Controller.createResolvedFromObject(rejected.message ? rejected.message : rejected);
                console.log('------------------------------------------------------------------');
                console.error(rejected);
                console.log('------------------------------------------------------------------');
                new FailureResponse(rejected.getStatusCode()).send(res)(rejected.getResponse())
            });
        };

        stack.push(apiAction);
        return stack;
    }


    getRoutes() {
        let ControllerActions = {};
        let routesHandler = Object.keys(this.routes);
        for (let i = 0; i < routesHandler.length; i++) {
            let action = (routesHandler[i]);
            ControllerActions[action] = this.action(this.routes[action]);
        }
        return ControllerActions;
    }

}
