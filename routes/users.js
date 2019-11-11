// const express = require("express");
// import {Router as UserRoute} from "../class/router/router";
// import {Resolved} from "../class/response/root/resolved";
//
// const router = express.Router();
// const route = new UserRoute(
//     [
//         {
//             handler: (request) => {
//                 return new Promise((resolve, reject) => {
//                     resolve(new Resolved(
//                         {
//                             name: "ranjana"
//                         }, 200
//                     ));
//                 })
//             },
//             options: {
//                 auth: true,
//                 method:"get",
//                 route:"/"
//             }
//         }
//     ]
// ).getRoutes();
//
//
// // router.get("/", route.getSingleUser);
//
// export default router


const express = require("express");
import {Router as UserRoute} from "../class/router/router";

const fs = require('fs');
import {Resolved} from "../class/response/root/resolved";

const router = express.Router();
const route = new UserRoute(
    {
        getSingleUser: (request) => {
            return new Promise((resolve, reject) => {
                resolve(new Resolved(
                    {
                        name: "ranjana"
                    }, 200
                ));
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
