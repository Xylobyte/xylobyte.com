const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");
const mime = require("mime-types");

const hostname = '127.0.0.1';
const port = 'passenger';

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '../public', req.url === '/' ? 'index.html' : req.url);
    const contentType = mime.lookup(filePath) || 'application/octet-stream';

    console.log(req.method, filePath, contentType);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, '../public', 'index.html'), (error, data) => {
                    if (error) {
                        res.writeHead(500);
                        res.end('Erreur 500, 2');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Erreur 500, 1');
            }
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Serveur démarré sur https://xylobyte.com`);
});
