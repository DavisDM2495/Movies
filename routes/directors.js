const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Director = require("../models/director");

//GET ALL DIRECTORS

router.get("", async (req, res) => {
    //get all directors
    const directors = await Director.findAll();

    res.json(directors);
});

module.exports = router; 