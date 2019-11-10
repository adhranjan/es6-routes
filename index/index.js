import express from 'express'
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

import userRouter from '../routes/users'


app.use("/user", userRouter);


app.listen(3002, () => console.log(`Example app listening on port 3000!`))
