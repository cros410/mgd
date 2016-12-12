const getConnection = require("../bd/conecction");
const log = require("../log/log");

var post = {
    nombre: "Diegoooooooo",
    dni: "897456234",
    direc: "Jr 2",
    distrito: "San borja",
    celular: "654987321",
    telefono: "8973214",
    correo: "diego@gmail.com",
    plan: "plan 3",
    megas: 2000,
    onair: 1,
    desc: 5
};

function select(req, res) {
    getConnection(function (err, con) {
        if (err) {
            res.send({ cod: 0, msg: err.code });
        } else {
            con.query("SELECT * from usuarios", function (err, rows, fields) {
                if (err) {
                    log.ferror(err);
                    res.send({ cod: 0, msg: err.code });
                } else {
                    con.release();
                    res.send(rows);
                }
            });
        }
    });
}

function select2(req, res) {
    res.render("login");
}

function insert(req, res) {
    pool.query('INSERT INTO usuarios SET ?', post, function (err, result) {
        if (err) {
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
            log.ferror(err);
        } else {
            res.send({ cod: 1, msg: "Data insertaeda con éxito" });
        }
    });
}

function delet(req, res) {
    var del = 11;
    pool.query('DELETE FROM usuarios WHERE idusuarios = ?', [del], function (err, result) {
        if (err) {
            log.ferror(err);
            res.send({ cod: 0, msg: err.code });
        } else {
            res.send({ cod: 1, msg: result.fieldCount + " campos afectado" });
        }
    });
}

function update(req, res) {
    var up = 11;
    pool.query('UPDATE usuarios SET nombre = ?, dni = ?, direc = ? WHERE idusuarios = ?', ['Miguel', '321654897', 'Av. Puno', up], function (err, result) {
        if (err) throw err;
        res.send("put-update");
    });
}

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
    select,
    select2,
    insert,
    delet,
    update,
    Login
}