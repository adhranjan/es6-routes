import express from 'express'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
import {Routes} from '../routes/index'

new Routes(app).startRouting();

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
