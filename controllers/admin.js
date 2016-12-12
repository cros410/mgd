'use strict';
const getConnection = require("../bd/conecction");
const log = require("../log/log");

function select2(req, res) {
    res.render("login");
}

function addUser(req, res) {
    res.render("adduser");
}

function regUser(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query('INSERT INTO usuarios SET ?', req.body, function (err, result) {
                if (err) {
                    log.ferror(err);
                    switch (err.code) {
                        case "ER_BAD_NULL_ERROR":
                            res.send({ cod: 0, msg: "No se aceptan null" });
                            break;
                        case "ER_DATA_TOO_LONG":
                            res.send({ cod: 0, msg: "Data muy larga" });
                            break;
                        default:
                            res.send({ cod: 0, msg: err.code });
                    }
                } else {
                    res.send({ cod: 1, msg: "Data insertaeda con éxito" });
                }
            });
        }
    });
}

function resDescarga(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query('UPDATE usuarios SET `desc` = `desc` - 1  WHERE idusuarios = ?', [27], function (err, result) {
                if (err) throw err;
                res.send("put-update");
            });
        }
    });
}


module.exports = {
    select2,
    addUser,
    regUser,
    resDescarga
}