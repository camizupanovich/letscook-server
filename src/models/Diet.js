const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize)=>{
    Sequelize.define('diet',{
        name:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {timestamps: false})
}