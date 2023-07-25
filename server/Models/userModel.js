const sequelize = require("../database/db")
const { Sequelize, DataTypes } = require('sequelize');


const userModel = sequelize.define("newProduct_userModel" , {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    // currentpassword:{
    //     type: DataTypes.STRING,
    //     allowNull: true,

    // },
    // newpassword:{
    //     type: DataTypes.STRING,
    //     allowNull: false,

    // }
   
})

module.exports = userModel ; 