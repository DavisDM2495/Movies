const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Actor = require("../models/actor");
//const actors = require("../frontend/actors.html");

//GET ALL ACTORS

router.get("", async (req, res) => {
    //get all actors
    const actors = await Actor.findAll();

    res.json(actors);
});

module.exports = router; 