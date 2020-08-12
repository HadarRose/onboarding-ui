const http = require('http');
const fs = require('fs');

const port = 9000;

let handleRequest = ((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./src/index.html',null, function (err, html){
        if (err){
            res.writeHead(404);
            res.write(":(");
        } else {
            res.write(html);
        }
        res.end();
    });
});

http.createServer(handleRequest).listen(port);

// tutorials: https://vegibit.com/render-html-in-node-js/
