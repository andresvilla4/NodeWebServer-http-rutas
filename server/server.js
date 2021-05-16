const http = require('http');
const fs = require('fs').promises;
const port = 3000;

let indexFile;

// Present html file on WebPage
const requestListener = function(req, res) {
    res.setHeader("Content-type", "text/html");

    switch (req.url) {
        case "/home":
            res.writeHead(200);
            res.end(indexFile);
            break
        case "/about":
            res.writeHead(200);
            res.end(indexFile);
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Page not found" }));
    }
};

// Create server
const server = http.createServer(requestListener);

let url = '/home.html';
//let url = '/about.html';

// Read html file and put the server on listening
fs.readFile(__dirname + '/UI' + url)
    //fs.readFile(__dirname + `/UI${url}`)
    .then(contents => {
        indexFile = contents;
        server.listen(port, () => {
            console.log(`Listening on port: ${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read html file: ${err}`);
        process.exit(1);
    });