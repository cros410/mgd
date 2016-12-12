'use strict';
const express = require("express");
const admin = express.Router();
const ctrAdmin = require("../controllers/admin");


admin.route("/")
    .get(ctrAdmin.select2)
    .post(ctrAdmin.regUser);

admin.route("/usuarios")
    .get(ctrAdmin.addUser);

admin.route("/test")
    .post(ctrAdmin.regUser)
    .put(ctrAdmin.resDescarga);

module.exports = admin;