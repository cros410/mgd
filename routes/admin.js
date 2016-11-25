'use strict';
const express = require("express");
const usuario = express.Router();
const ctrUsuario = require("../controllers/admin");


usuario.route("/usuario")
    .get(ctrUsuario.select2);
    


module.exports=usuario;