const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Invoice = db.define('invoice',{
    id:{
        primaryKey:true,
        allowNull: false,
        type: DataTypes.UUID
    },
    date:{
        allowNull:false,
        type: DataTypes.DATEONLY
    },
    hour:{
        allowNull: false,
        type: DataTypes.TIME
    },
    totalPrice: {
        type: DataTypes.FLOAT
    }
})

module.exports = Invoice