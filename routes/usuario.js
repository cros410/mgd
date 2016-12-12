'use strict';
const express = require("express");
const usuario = express.Router();
const ctrUsuario = require("../controllers/usuario");

usuario.route("/")
    .get(ctrUsuario.select)
    .post(ctrUsuario.insert)
    .put(ctrUsuario.update)
    .delete(ctrUsuario.delet);
    
usuario.route("/login")
    .get(ctrUsuario.select2)
    .post(ctrUsuario.Login)
    .put(ctrUsuario.update)
    .delete(ctrUsuario.delet);


module.exports=usuario;