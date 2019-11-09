var express = require("express");
var routerController = require("../class/router/router");
var router = express.Router();

var userRoute = new routerController(
    {
        getSingleUser: (request) => {
            return new Promise((resolve) => {
                resolve(request)
            })
        },
        getSingleUserAll: () => {
            console.log('hello')
        },
    }, {
        getAllUser: {
            auth: true
        },
        getAllUserAll: {
            auth: true
        }
    }
).getRoutes();


router.get("/", userRoute.getSingleUser);
module.exports = router;


