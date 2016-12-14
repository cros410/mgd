'use strict';
const express = require("express");
const login = express.Router();
const ctrBase = require("../controllers/index");



login.route("/")
    .post(ctrBase.Login)
    .get(ctrBase.showLogin);

module.exports=login;

