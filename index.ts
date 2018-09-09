import * as express from "express";
import { CONFIG } from "./config";

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
    PXE sample app running DEMO DEMO cloned from github. 
    DEMO Environment Variable set for [env_name] is: ${process.env.env_name}. 
    APP VERSION: ${CONFIG.app_version}
    
    `)
});

app.listen(8080, () => {
    console.log("sample app started on  http://localhost:8080");
});
