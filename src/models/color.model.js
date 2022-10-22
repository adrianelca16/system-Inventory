const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Color = db.define('color',{
    id:{
        primaryKey:true,
        allowNull: false,
        type: DataTypes.UUID
    },
    name:{
        allowNull:false,
        type: DataTypes.STRING
    }
})

module.exports = Color