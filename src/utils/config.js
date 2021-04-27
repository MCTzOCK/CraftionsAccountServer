const fs = require('fs');
const path = require('path');

const configRoot = path.join(__dirname, '../../config')

let conf = undefined;

exports.createBlank = function(){
    if(!fs.existsSync(configRoot)){
        fs.mkdirSync(configRoot);
    }
    if(!fs.existsSync(path.join(configRoot, 'app.json'))){
        fs.writeFileSync(path.join(configRoot, 'app.json'), JSON.stringify({
            port: 8080,
            host: "0.0.0.0"
        }));
    }
}

exports.reloadConfig = function (save) {
    if(save) {
        fs.writeFileSync(path.join(configRoot, 'app.json'), JSON.stringify(conf));
    }
    conf = JSON.parse(fs.readFileSync(path.join(configRoot, 'app.json')))
}

exports.getOption = function(option){
    return conf[option];
}

exports.getRaw = function() {
    return conf;
}