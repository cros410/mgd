const getConnection = require("../bd/conecction");
const log = require("../log/log");
const bcrypt = require('bcrypt-nodejs');

function showSignup(req, res) {
    var dni = req.query.id;
    getConnection(function (err, con) {
        if (err) {
            done({ cod: 0, msg: err.code })
        } else {
            con.query("SELECT * from usuarios  WHERE dni = ? ", [dni], function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code })
                } else {
                    if (rows.length > 0) {
                        if (rows[0].estado === 2) {
                            res.render("signup", { usuario: rows[0].dni });
                        } else {
                            res.send({ cod: 0, msg: "Usuario ya validado" });
                        }
                    } else {
                        res.send({ cod: 0, msg: "Usuario no registrado" });
                    }
                }
                con.release();
            });
        }
    });
}

function Signup(req, res) {
    var dni = req.body.dni;
    var pwd = bcrypt.hashSync(req.body.pwd, null, null);
    var code = req.body.code;
    console.log(dni);
    console.log(req.body.pwd);
    console.log(pwd);
    console.log(code);

    getConnection(function (err, con) {
        if (err) {
            res.render({ cod: 0, msg: err.code });
        } else {
            var updateQuery = "UPDATE usuarios SET pwd = ? , estado = ?  WHERE dni = ? and estado = ? and pwd = ? ";
            con.query(updateQuery, [pwd, 1, dni, 2, code], function (err, result) {
                if (err) {
                    res.send({ cod: 0, msg: err.code })
                } else {
                    if (result.affectedRows > 0) {
                        res.send("Todo Correcto");
                    } else {
                        res.send({ cod: 0, msg: "Credenciales no válidas" });
                    }
                }
                con.release();
            });
        }
    });

}

module.exports = {
    showSignup,
    Signup
}