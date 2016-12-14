const getConnection = require("../bd/conecction");
const log = require("../log/log");

function Login(req, res) {
    var dni = req.body.username;
    var pwd = req.body.password;

    getConnection(function (err, con) {
        if (err) {
            done({ cod: 0, msg: err.code })
        } else {
            con.query("SELECT * from usuarios  WHERE dni = ? and pwd = ? ", [dni, pwd], function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code })
                } else {
                    if (rows.length > 0) {
                        res.send({ cod: 1, usuario: rows[0] });
                    } else {
                        res.send({ cod: 0, msg: "Usuario no registrado" });
                    }
                }
                con.release();
            });
        }
    });
}

function showLogin(req, res) {
    res.render("login");
};

module.exports = {
    Login,
    showLogin
}