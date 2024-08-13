const { DataTypes } = require("sequelize");

const sequelize = require("../database");

const Director = sequelize.define("Director", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Director;