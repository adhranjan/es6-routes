const q = require('q');
const Controller = require('../library/Controller');
const successResponse = require('../response/success-response');

function ErrorHandler(next) {
    return function (err) {
        next(err);
    };
}

class Router extends Controller {

    constructor(routes) {
        super();
        this.routes = routes;
        this.actions = Object.keys(routes);
    }


    loadParams(req) {
        var out;
        let query = this.parseJsonArray(req.query);
        let params = this.parseJsonArray(req.params);
        out = {
            ...params,
            ...query
        };
        return out;
    };


    action(action) {
        if (typeof action !== "function") {
            throw new Error("Invalid Action: \n" + action);
        }
        let stack = [];
        let apiAction = (req, res, next) => {

            q(this.loadParams(req))
                .then(this.validateSchema(this.routes.schema, {
                    ...req.body,
                    ...req.query,
                    ...req.param,
                })).then(function (data) {
                return action.apply(this, [data]);
            })
                .then(new successResponse().send(res))
                .catch(ErrorHandler(next));
        };

        stack.push(apiAction);
        return stack;
    }


    getRoutes() {
        var ControllerActions = {};
        for (let i = 0; i < this.actions.length; i++) {

            let action = (this.actions[i]);

            ControllerActions[action] = this.action(this.routes[action]);
        }
        return ControllerActions;
    }

}

module.exports = Router
