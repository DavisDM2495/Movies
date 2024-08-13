const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Movie = require("../models/movie");

//GET ALL MOVIES

router.get("", async (req, res) => {
    //get all movies
    const movies = await Movie.findAll();

    res.json(movies);
});

module.exports = router; 