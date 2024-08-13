const { DataTypes } = require("sequelize");

const sequelize = require("../database");

const Actor = sequelize.define("Actor", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

module.exports = Actor;