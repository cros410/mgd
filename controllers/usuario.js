const getConnection = require("../bd/conecction");
const log = require("../log/log");


function Login(req, res) {
    getConnection(function (err, con) {
        if (err) {
            log.ferror(err);
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query("SELECT * from usuarios", function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code });
                } else {
                    con.release();
                    res.render("login",rows);
                }
            });
        }
    });
}

module.exports = {
    Login
}