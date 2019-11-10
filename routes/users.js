const express = require("express");
const routerController = require("../class/router/router");
const router = express.Router();

const userRoute = new routerController(
    {
        getSingleUser: (request) => {
            return new Promise((resolve, reject) => {
                resolve(

                    {
                        name: "ranjan"
                    }

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


router.get("/", userRoute.getSingleUser);
module.exports = router;


