'use strict';
const express = require("express");
const admin = express.Router();
const ctrAdmin = require("../controllers/admin");

//Middleware to validate user auth
admin.use(function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
});



admin.route("/usuarios")
    .get(ctrAdmin.showListUsuario); //Listar Usuarios 

admin.route("/action") // Mostrar la accion del CRUD
    .get(ctrAdmin.showActionUser);

admin.route("/reguser") // Ejecutar la accion del CRUD
    .get(ctrAdmin.showRegUser)
    .post(ctrAdmin.regUser);

admin.route("/usuario") //Ejecutar acciones del crud
    .post(ctrAdmin.updateUserInfo)
    .put(ctrAdmin.changeState)
    .delete(ctrAdmin.deleteUser);

admin.route("/download") //Ejecutar descargas 
    .post(ctrAdmin.downloadFile)
    .get(ctrAdmin.downlodReport);

admin.route("/")
    .get(ctrAdmin.select2)
    .post(ctrAdmin.regUser);

admin.route("/test")
    .post(ctrAdmin.regUser)
    .put(ctrAdmin.downlodReport);

module.exports = admin;