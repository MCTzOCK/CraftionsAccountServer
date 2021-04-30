// import required node modules
const http      = require('http');
const fs        = require('fs');
const path      = require('path');
const url       = require('url');
const hash      = require('./utils/hash');
const config    = require('./utils/config');

// import routes
const route_default     = require('./routes/default')
const route_api         = require('./routes/api')

// spam text to console :D
console.log('Welcome to Craftions Account Server.')
console.log('Copyright (c) 2020-2021 Craftions.net and Ben Siebert. All rights reserved.')

// create empty config if not exists
config.createBlank();
// load config
config.reloadConfig(false);

// print the configuration to console
console.log('Your config:');
console.log('Port: ' + config.getOption("port"));
console.log('Host: ' + config.getOption("host"));

// create http server
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    // get the request path
    let p = url.parse(req.url).path;
    if(p.startsWith("/api")){
        route_api.execute(req, res);
    }else {
        route_default.execute(req, res);
    }
})

// start http server
console.log('Starting HTTP Server...')
server.listen(config.getOption('port'), config.getOption('host'), 1)