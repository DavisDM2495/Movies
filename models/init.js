const sequelize = require("../database");
const Movie = require("./movie");
const Actor = require("./actor");
const Director = require("./director");

const models = {
    Movie,
    Actor,
    Director
};

Movie.hasMany(Actor);
Movie.belongsTo(Director);
Actor.hasMany(Movie);
Director.hasMany(Movie);

module.exports = {
    sequelize,
    models
};