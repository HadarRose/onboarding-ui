const http = require('http'); // docs: https://nodejs.org/api/http.html
const fs = require('fs'); // docs: https://nodejs.org/docs/v0.3.1/api/fs.html
const path = require('path');

const port = 9000; // port to which this server will be listening 

let handleRequest = ((req, res) => {
    console.debug("Request received at URL: " + req.url);

    var reqPath = '.' + req.url;
    if(reqPath == './'){ // if request was for root, return index.html instead
        reqPath = './src/index.html'; 
    }

    var contentType = 'text/html'; // default content type to HTML 
    if(path.extname(reqPath) == '.js'){
        contentType = 'text/javascript';
    }


    // read file from specified path, and process it with err being the possible error thrown and html being the content read
    fs.readFile(reqPath, function (err, content){
        if (err){
            console.error("error reading file at: " + reqPath);
            res.writeHead(404); // change status to error in case of an error. Can write my own error here, if I'd like. 
        } else {
            console.debug("Writing HTML to response");
            res.writeHead(200, {'Content-Type': contentType});
            res.write(content);
        }
        res.end();
    });
});

http.createServer(handleRequest).listen(port);


