var express = require("express");
var routerController = require("../class/router/router");
var router = express.Router();

var userRoute = new routerController(
    {
        getAllUser: () => {
            return new Promise((resolve)=>{
                resolve({
                    name:"anything"
                })
            })
        },
        getSingleUser: () => {
            console.log('hello')
        },

    }
).getRoutes();


router.get("/", userRoute.getAllUser);
module.exports = router;


