const q = require('q');
const Controller = require('../library/Controller');
const successResponse = require('../response/success-response');
const Request = require('../request/root/request');

function ErrorHandler(next) {
    return function (err) {
        next(err);
    };
}

class Router extends Controller {

    constructor(routes, options) {
        super();
        this.routes = routes;
        this.options = options;
    }


    static loadParams(req) {
        var out;
        let query = Controller.parseJsonArray(req.query);
        let params = Controller.parseJsonArray(req.params);
        let body = Controller.parseJsonArray(req.body);
        return new Request(query, params, body);
    };


    action(action) {
        if (typeof action !== "function") {
            throw new Error("Invalid Action: \n" + action);
        }
        let stack = [];
        let apiAction = (req, res, next) => {

            let option = this.options[action.name];
            if(!option){
                option = {}
            }

            q(Router.loadParams(req))
                .then(this.validateSchema(option.schema, {
                    ...req.body,
                    ...req.query,
                    ...req.params,
                })).then(function (request) {
                return action.apply(this, request);
            })
                .then(new successResponse().send(res))
                .catch((errorType)=>{
                    // TODO make a global error and other error classes
                    errorType(next)
                });
        };

        stack.push(apiAction);
        return stack;
    }


    getRoutes() {
        var ControllerActions = {};
        let routesHandler = Object.keys(this.routes);
        for (let i = 0; i < routesHandler.length; i++) {

            let action = (routesHandler[i]);

            ControllerActions[action] = this.action(this.routes[action]);
        }
        return ControllerActions;
    }

}

module.exports = Router
