const mysql = require("mysql");
const dbconfig = require("../config/db.json");
const mode = dbconfig.mode;
const db = dbconfig[mode];
const pool = mysql.createPool({
    connectionLimit: dbconfig[mode].pool,
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.pwd,
    database: db.database
});

var getConnection = function (cb) {
    pool.getConnection(function (err, connection) {
        if(err) {
          return cb(err);
        }
        cb(null, connection);
    });
};
module.exports = getConnection;