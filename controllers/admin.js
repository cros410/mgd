'use strict';
const getConnection = require("../bd/conecction");
const log = require("../log/log");
const fs = require('fs');
const download = require('download');
const sendMail = require("../suport/sendMail");
const random = require("../suport/randomcode");

function select2(req, res) {
    res.render("login");
}

//Mostrar pantalla de registro de usuario
function showRegUser(req, res) {
    res.render("adduser");
}
//Registrar usuario
function regUser(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            var codran = random.getRandomCode();
            var us = req.body;
            us.pwd = codran;
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
                    var user = {};
                    user.name = req.body.nombre;
                    user.codigo = codran;
                    user.usermail = req.body.correo;
                    sendMail.sendMailRegistro(user, (err, data) => {
                        if (err) {
                            res.send({ cod: 0, err: err, msg: "Error envio de mensaje" });
                        } else {
                            res.redirect('/admin/usuarios');
                        }
                    });
                }
                con.release();
            });
        }
    });
}
//Lista de usuarios
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
//Exe actions
function showActionUser(req, res) {
    var action = req.query.action;
    var _id = req.query.id;
    switch (action) {
        case "1":
            getUserInfo(_id, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("showuser", data);
                }
            });
            break;
        case "2":
            getUserInfo(_id, (err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.render("updateuser", data);
                }
            });
            break;
        case "3":
            console.log("eliminar");
            break;
        default:
            console.log("nada");
    }
}
// get Infod del usuario
function getUserInfo(_id, done) {
    getConnection(function (err, con) {
        if (err) {
            done({ cod: 0, msg: err.code })
        } else {
            con.query("SELECT * from usuarios  WHERE idusuarios = ?", [_id], function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    done({ cod: 0, msg: err.code })
                } else {
                    done(null, { usuario: rows[0] })
                }
                con.release();
            });
        }
    });
}
// Cambiar el estado de activo a no activo 
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
//Actualizar informacion del usuario
function updateUserInfo(req, res) {
    var user = req.body;
    var aruser = getArrayFromObject(user);
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query("UPDATE usuarios SET nombre = ?, dni = ?, direc = ? , distrito = ? ," +
                " celular = ? , telefono = ? , correo = ? ,  plan = ? , megas = ? , onair = ? WHERE idusuarios = ?",
                aruser, function (err, result) {
                    if (err) {
                        log.ferror(err);
                        res.send({ cod: 0, msg: err.code });
                    } else {
                        res.redirect('/admin/usuarios');
                    }
                    con.release();
                });
        }
    });
}
//Eliminar un ususario
function deleteUser(req, res) {
    var _id = req.body.id;
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query('DELETE FROM usuarios  WHERE idusuarios = ?', [_id], function (err, result) {
                if (err) throw err;
                res.send({ cod: 1, msg: "Eliminado correctamente" });
            });
        }
        con.release();
    });

}
//Descargr archivo
function downloadFile(req, res) {
    var _id = req.body.id;
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query('UPDATE usuarios SET `desc` = `desc` - 1  WHERE idusuarios = ?', [_id], function (err, result) {
                if (err) throw err;
                res.send({ cod: 1, msg: "Descarga exitosa" });
            });
            con.release();
        }
    });
}


//Soporte
function getArrayFromObject(obj) {
    return [obj["nombre"], obj["dni"], obj["direc"], obj["distrito"], obj["celular"],
    obj["telefono"], obj["correo"], obj["plan"], obj["megas"], obj["onair"], obj["idusuarios"]];
}

function getText(ar, done) {
    var data = "";
    for (var i = 0; i < ar.length; i++) {
        data = data + getLine(ar[i]);
        console.log("i : " + i);
        console.log("ar : " + ar.length);
        if (i == (ar.length - 1)) {
            done(data);
        }
    }
}

function getLine(obj) {
    return "\n" + obj.nombre + "\t" + obj.dni + "\t" + obj.direc + "\t" + obj.distrito + "\t" + obj.celular
        + "\t" + obj.telefono + "\t" + obj.correo + "\t" + obj.plan + "\t" + obj.megas + "\t" + obj.onair
        + "\t" + obj.desc + "\t" + obj.dete;
}

function getFirstLine() {
    return "NOMBRE" + "\t" + "DNI" + "\t" + "DIRECCION" + "\t" + "DISTRITO" + "\t" + "CELULAR" + "\t"
        + "TELEFONO" + "\t" + "CORREO" + "\t" + "PLAN" + "\t" + "MEGAS" + "\t" + "DISPONIBLE" + "\t"
        + "CANT. DESCARGAS " + "\t" + "FECHA REGISTRO" + "\t"
}
//


// Descar el reporte de lista de usuarios
function downlodReport(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query("SELECT * from usuarios", function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code });
                } else {
                    getText(rows, (data) => {
                        fs.writeFile('public/files/usuarios.xls', getFirstLine(), (err) => {
                            if (err) throw err;
                            var logger = fs.appendFile('public/files/usuarios.xls', data, (err) => {
                                if (err) throw err;
                                res.send({ cod: 1, msg: "Archivo listo" });
                            });
                        });
                    });
                }
                con.release();
            });
        }
    });

}

module.exports = {
    select2,
    showRegUser,
    regUser,
    showListUsuario,
    changeState,
    showActionUser,
    updateUserInfo,
    deleteUser,
    downloadFile,
    downlodReport
}