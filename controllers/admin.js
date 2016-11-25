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


function select2(req, res) {
    res.render("/usuario/usuarios");
}



module.exports = {
    select2
}