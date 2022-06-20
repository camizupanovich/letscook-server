const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    steps:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue:'https://static.vecteezy.com/system/resources/previews/003/594/976/original/one-continuous-line-drawing-of-young-handsome-male-chef-opening-cloche-tray-to-serve-main-dish-to-customer-at-hotel-restaurant-excellent-service-concept-single-line-draw-design-illustration-vector.jpg'
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
  },{timestamps: false});
};