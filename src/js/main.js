const http = require('http'); // docs: https://nodejs.org/api/http.html
const fs = require('fs'); // docs: https://nodejs.org/docs/v0.3.1/api/fs.html

const port = 9000; // port to which this server will be listening 

let handleRequest = ((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // read file from specified path, and process it with err being the possible error thrown and html being the content read
    fs.readFile('./src/index.html', function (err, html){
        if (err){
            res.writeHead(404); // change status to error in case of an error. Can write my own error here, if I'd like. 
        } else {
            res.write(html);
        }
        res.end();
    });
});

http.createServer(handleRequest).listen(port);