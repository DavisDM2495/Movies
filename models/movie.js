const { DataTypes } = require("sequelize");

const sequelize = require("../database");

const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Movie;