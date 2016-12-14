'use strict';
const express = require("express");
const usuario = express.Router();
const ctrUsuario = require("../controllers/usuario");

   
usuario.route("/login")
    .post(ctrUsuario.Login);
    

module.exports=usuario;