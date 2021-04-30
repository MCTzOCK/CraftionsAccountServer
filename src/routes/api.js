const fs    = require('fs');
const path  = require('path');
const url   = require('url');
const hash  = require('../utils/hash')

// config
if(!fs.existsSync(path.join(__dirname, '../../config/users.json'))){
    fs.writeFileSync(path.join(__dirname, '../../config/users.json'), JSON.stringify({currentID: 0, users:[]}))
}

const uConf = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config/users.json')))

exports.execute = function (req, res){
    let p = url.parse(req.url).pathname;
    let q = url.parse(req.url).query;
    let a = p.split('/');
    // TODO: Try Catch block
    switch(a[2].toLowerCase()){
        case "createuser":
            let userName = a[3];
            let password = hash.toMD5(a[4]);
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
        default:
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: true, code: 404, msg: 'Could not find API endpoint ' + a[2]}))
    }
}