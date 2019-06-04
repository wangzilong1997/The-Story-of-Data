var fs = require('fs')
var privatepem = fs.readFileSync('path/to/2031967_www.wangshuaishuai.com.pem','utf8')
var privatekey = fs.readFileSync('path/to/2031967_www.wangshuaishuai.com.key','utf8')

var credentials = {key:privatekey,cert:privatepem}

exports.credentials;
