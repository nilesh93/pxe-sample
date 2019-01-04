import * as express from "express";
import { CONFIG } from "./config";
import { CONFIG_SECRET } from "./config.secret";

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors')
var formidable = require('formidable');
var fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'))

app.get('/', async (req, res) => {
    let html = `
    <h2> PXE Basic Info </h2>
    Hello PXE   Welcome to the Demo  on Jan 2019 <br>       
    PXE sample app running  cloned from github.  <br>
    Environment Variable set for [env_name] is: ${process.env.env_name}. <br>
    Encrypted Environment Variable set for [env_name_secret] is: ${process.env.env_name_secret}. <br>
    APP VERSION: ${CONFIG.app_version} <br>
    Encrypted VERSION: ${CONFIG_SECRET.app_version} <br>
    Platformer image version: ${process.env.PLATFORMER_IMG_TAG}
    <br>
    --------------------------------
    <h2> Upload Test Form </h2>
    <form action="/" enctype="multipart/form-data" method="post">
    <input type="file" name="upload" multiple>
    <input type="submit" value="Upload">
    </form>
    <br>
    ================================
    <br> 
    <h2> Uploaded files </h2>
    <ul>
    `;


    html = <string>await getUploads(html);

    html += '</ul>';

    res.send(html)
});



app.post('/', function (req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file) {
        console.log('Uploaded ' + file.name);
    });

    res.redirect('/');
});


app.listen(8080, () => {
    console.log("sample app started on  http://localhost:8080");
});


async function getUploads(html) {
    return new Promise((resolve, reject) => {
        fs.readdir(__dirname + '/uploads/', function (err, items) {
            if (err) {
                resolve(html)
                return;
            }
            if (!items) {
                resolve(html)
                return;
            }
            for (var i = 0; i < items.length; i++) {
                console.log(items[i]);
                html += `<li> <a href="/uploads/${items[i]}" target="_blank"> ${items[i]} </li>`;
            }
            resolve(html);
        });
    });
}