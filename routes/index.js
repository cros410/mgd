'use strict'
const ctrlIndex = require("../controllers/index");
const express = require("express");
const index = express.Router();

index.route("/login")
    .get(ctrlIndex.showLogin);