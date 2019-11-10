const express = require("express");
import {Router as UserRoute} from "../class/router/router";
import {Resolved} from "../class/response/root/resolved";

const router = express.Router();
const route = new UserRoute(
    {
        getSingleUser: (request) => {
            return new Promise((resolve, reject) => {
                throw new Error('Baby');

                resolve(
                    new Resolved({
                        name: "riya"
                    }, 404)
                )
            })
        }
    }, {
        getAllUser: {
            auth: true
        },
        getAllUserAll: {
            auth: true
        }
    }
).getRoutes();


router.get("/", route.getSingleUser);

export default router
