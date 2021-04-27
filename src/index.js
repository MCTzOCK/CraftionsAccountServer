// import required node modules
const http      = require('http');
const fs        = require('fs');
const path      = require('path');
const hash      = require('./utils/hash')
const config    = require('./utils/config')

// spam text to console :D
console.log('Welcome to Craftions Account Server.')
console.log('Copyright (c) 2020-2021 Craftions.net and Ben Siebert. All rights reserved.')

// create empty config if not exists
config.createBlank();
// load config
config.reloadConfig(false);

console.log('Your config:');
console.log('Port: ' + config.getOption("port"));
console.log('Host: ' + config.getOption("host"));

// create http server
const server = http.createServer((req, res) => {
    res.end('Craftions Account System');
})

// start http server
console.log('Starting HTTP Server...')
server.listen(config.getOption('port'), config.getOption('host'), 1)