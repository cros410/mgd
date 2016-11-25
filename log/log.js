const Log = require("log");
const fs = require("fs");
const error = new Log('error', fs.createWriteStream(__dirname + '/error.log'));
const log = new Log('log', fs.createWriteStream(__dirname + '/log.log'));

function ferror(msg){
    error.error(msg);
}

function flog(msg){
    return log.info(msg); 
}

module.exports={
    ferror,
    flog
}