const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const userModel = require("./userModel");

const productModel = sequelize.define("giri_newProductModel", {
  // Model attributes are defined here
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // allowNull defaults to true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
  },
  UserId: {
    type: Sequelize.INTEGER,
  },
});

userModel.hasMany(productModel, {
  foreignKey: "UserId",
  as: "Product",
});
productModel.belongsTo(userModel, {
  foreignKey: "UserId",
  as: "userInfo",
});
module.exports = productModel;
