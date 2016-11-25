'use strict';
const express = require("express");
const usuario = express.Router();
const ctrUsuario = require("../controllers/usuarios");

usuario.route("/")
    .get(ctrUsuario.select2)
    .post(ctrUsuario.insert)
    .put(ctrUsuario.update)
    .delete(ctrUsuario.delet);
usuario.route("/login")
    .get(ctrUsuario.select2)
    .post(ctrUsuario.Login)
    .put(ctrUsuario.update)
    .delete(ctrUsuario.delet);


module.exports=usuario;