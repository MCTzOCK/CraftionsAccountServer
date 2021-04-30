const fs    = require('fs');
const path  = require('path');
const url   = require('url');
const hash  = require('../utils/hash')

// config
if(!fs.existsSync(path.join(__dirname, '../../config/users.json'))){
    fs.writeFileSync(path.join(__dirname, '../../config/users.json'), JSON.stringify({currentID: 0, users:[]}))
}
if(!fs.existsSync(path.join(__dirname, '../../config/tokens.json'))){
    fs.writeFileSync(path.join(__dirname, '../../config/tokens.json'), JSON.stringify({}))
}

const uConf = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/users.json')))
const tConf = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/tokens.json')));

exports.execute = function (req, res){
    let p = url.parse(req.url).pathname;
    let q = url.parse(req.url).query;
    let a = p.split('/');
    // TODO: Try Catch block
    switch(a[2].toLowerCase()){
        case "createuser":
            var userName = a[3];
            var password = hash.toMD5(a[4]);
            let allowCreation = true;
            uConf['users'].forEach(user => {
                if(user.name === userName){
                    allowCreation = false;
                }
            })
            if(allowCreation){
                uConf['users'].push({
                    name: userName,
                    id: uConf['currentID'] + 1,
                    pass: password,
                    active: true // TODO: activation email
                })
                uConf['currentID'] = uConf['currentID'] + 1;
                fs.writeFileSync(path.join(__dirname, '../../config/users.json'), JSON.stringify(uConf));
                res.writeHead(200, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: false, code: 200, msg: 'Successful.'}))
            }else {
                res.writeHead(409, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: true, code: 409, msg: 'A user with that name does already exists.'}))
            }
            break;
        case "login":
            var userName = a[3];
            var password = hash.toMD5(a[4]);
            let f = false;
            uConf['users'].forEach(user => {
                if(user.name === userName){
                    if(user.pass === password){
                        res.writeHead(200, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: false, code: 200, msg: 'Successful'}));
                        f = true;
                    }else {
                        res.writeHead(403, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: true, code: 403, msg: 'Forbidden'}));
                        f = true;
                    }
                }
            })
            if(!f){
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: true, code: 404, msg: 'Not Found.'}));
            }
            break;
        case "createtoken":
            var userName        = a[3];
            var password        = hash.toMD5(a[4]);
            var allow           = true;
            uConf['users'].forEach(user => {
                if(user.name === userName){
                    if(user.pass !== password){
                        allow = false;
                        res.writeHead(403, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: true, code: 403, msg: 'Wrong username or password'}));
                    }
                }
            })
            if(allow){
                let found = false;
                let token = '';
                while (!found){
                    token = getRandomString(64);
                    if(!tConf[token]){
                        found = true;
                    }
                }
                tConf[token] = userName;
                fs.writeFileSync(path.join(__dirname, '../../config/tokens.json'), JSON.stringify(tConf))
                res.writeHead(200, {'Conent-Type': 'application/json'});
                res.end(JSON.stringify({error: false, code: 200, msg: 'Successful.', token: token}))
            }
            break;
        case "getdata":
            var token = a[3];
            var data = a[4];
            if(tConf[token]){
                if(data === 'name'){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: false, code: 200, msg: 'Successful', data: tConf[token]}))
                }else {
                    res.writeHead(404, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({error: true, code: 404, msg: 'Could not find data entry'}))
                }
            }else {
                res.writeHead(403, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: true, code: 403, msg: 'Forbidden'}));
            }
            break;
        default:
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: true, code: 404, msg: 'Could not find API endpoint ' + a[2]}))
    }
}

function getRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}