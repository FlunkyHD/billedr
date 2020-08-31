// https://stackoverflow.com/questions/16333790/node-js-quick-file-server-static-files-over-http
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const IMGPATH = "./img";


const requestListener = function (req, res) {
    console.log(`${req.method} ${req.url}`);

    let splitUrl = req.url.split("/"); // Index 0 is ""
    
    /** 
    if(splitUrl[1] === "picture"){
        res.writeHead(302, {"Location": "/picture/picture-index.html?" + splitUrl[2]});
        res.write("HEEEJJJJ");
        res.end();
    }  */

    if(req.url === "/get/pictureCount/"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(getAllDirFiles(IMGPATH)));
        res.end('\n');
    }

    // parse URL
    const parsedUrl = url.parse(req.url);
    
    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;
    console.log(pathname);

    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    const ext = path.parse(pathname).ext;
    
    // maps file extention to MIME typere
    const map = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword'
    };

    fs.exists(pathname, function (exist) {
        if (!exist) {
            // if file doesn't exist, return error (404)
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // if is a directory search for index file matching the extention
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index' + ext;
        }

        // read file from file system
        fs.readFile(pathname, function (error, data) {
            if (error) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${error}.`);
            }
            else {
                // if the file is found, set content type and send data
                res.setHeader('Content-type', map[ext] || 'text/plain');
                res.end(data);
            }
        });
    });

}

const server = http.createServer(requestListener);
server.listen(8080);
console.log('Server running at http://127.0.0.1:8080');


const getAllDirFiles = function (dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(file);
        }
    })

    return arrayOfFiles;
}