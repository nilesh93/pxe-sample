import * as express from "express";

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`PXE sample app running. Environment Variable set for [env_name] is: ${process.env.env_name}`)
});

app.listen(8080, () => {
    console.log("sample app started   on  http://localhost:8080");
});
