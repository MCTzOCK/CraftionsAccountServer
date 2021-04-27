const crypto = require('crypto-js')

exports.toMD5 = function (msg) {
    return crypto.MD5(msg).toString();
}