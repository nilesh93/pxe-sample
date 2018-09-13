import * as express from "express";
import { CONFIG } from "./config";
import { CONFIG_SECRET } from "./config.secret";

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send(`
    Hello <br>
    PXE sample app running  cloned from github.  <br>
    Environment Variable set for [env_name] is: ${process.env.env_name}. <br>
    Encrypted Environment Variable set for [env_name_secret] is: ${process.env.env_name_secret}. <br>
    APP VERSION: ${CONFIG.app_version} <br>
    Encrypted VERSION: ${CONFIG_SECRET.app_version} <br>
    
    `)
});

app.listen(8080, () => {
    console.log("sample app started on  http://localhost:8080");
});
