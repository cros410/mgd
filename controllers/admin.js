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

function showListUsuario(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query("SELECT * from usuarios", function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code });
                } else {
                    res.render("usuarios", { data: { usuarios: rows } });
                }
                con.release();
            });
        }
    });
}

function showAction(req, res) {
    var action = req.query.action;
    switch (action) {
        case "1":
            console.log("ver");
            break;
        case "2":
            console.log("editar");
            break;
        case "3":
            console.log("eliminar");
            break;
        default:
            console.log("nada");
    }
}

function changeState(req, res) {
    var state = req.body.state;
    var _id = req.body.id;
    if (state == "0" || state == "1") {
        var nst = 0;
        if (state == "0") {
            nst = 1;
        }
        getConnection(function (err, con) {
            if (err) {
                res.send({ cod: 0, msg: err.code });
            } else {
                con.query('UPDATE usuarios SET onair = ' + nst + '  WHERE idusuarios = ?', [_id], function (err, result) {
                    if (err) throw err;
                    res.send({ cod: 1, msg: "Cambiado a estado " + nst });
                });
            }
            con.release();
        });
    } else {
        res.send({ cod: 0, msg: "Dato no válido" });
    }
}

module.exports = {
    select2,
    addUser,
    regUser,
    resDescarga,
    showListUsuario,
    showAction,
    changeState
}