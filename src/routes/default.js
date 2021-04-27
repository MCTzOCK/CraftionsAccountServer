const fs                = require('fs');
const path              = require('path');
const url               = require('url');
const mime              = require('mime-types');
const DOCUMENT_ROOT     = path.join(__dirname, '../public');

exports.execute = function(req, res){
    let p = url.parse(req.url).path;
    if(fs.existsSync(path.join(DOCUMENT_ROOT, p))){
        if(!fs.lstatSync(path.join(DOCUMENT_ROOT, p)).isDirectory()){
            res.writeHead(200, {"Content-Type": mime.lookup(p.split('/')[p.split('/').length])})
            res.end(fs.readFileSync(path.join(DOCUMENT_ROOT, p)));
        }else {
            if(fs.existsSync(path.join(path.join(DOCUMENT_ROOT, p), 'index.html'))){
                res.writeHead(200, {"Content-Type": mime.lookup(p.split('/')[p.split('/').length] + 'index.html')})
                res.end(fs.readFileSync(path.join(path.join(DOCUMENT_ROOT, p), 'index.html')));
            }else {
                res.writeHead(404, {"Content-Type": "text/html"})
                res.end(fs.readFileSync(path.join(__dirname, '../error/404.html')))
            }
        }
    }else {
        let t = path.join(DOCUMENT_ROOT, p) + '.html';
        if(!fs.existsSync(t)){
            res.writeHead(404, {"Content-Type": "text/html"})
            res.end(fs.readFileSync(path.join(__dirname, '../error/404.html')))
        }else {
            res.writeHead(200, {"Content-Type": mime.lookup(p.split('/')[p.split('/').length] + '.html')})
            res.end(fs.readFileSync(t));
        }
    }
}