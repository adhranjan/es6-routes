var express = require("express");
var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let usersRouter = require('../routes/users');


app.use("/user", usersRouter);


app.listen(3002, () => console.log(`Example app listening on port 3000!`))
