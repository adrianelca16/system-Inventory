const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')
const Color = require('./color.model')

const Inventory = db.define('inventory',{
    id:{
        primaryKey: true,
        allowNull:false,
        type: DataTypes.UUID
    },
    name:{
        allowNull:false,
        type: DataTypes.STRING
    },
    quantity:{
        allowNull:false,
        type:DataTypes.INTEGER
    },
    colorId:{
        allowNull:false,
        type: DataTypes.UUID,
        references:{
            model: Color,
            key:'id'
        },
        field: 'color_id'
    },
    purchasePrice:{
        allowNull:false,
        type: DataTypes.FLOAT,
        field: 'purchase_price'
    },
    salePrice:{
        allowNull:false,
        type: DataTypes.FLOAT,
        field: 'sale_price'
    }
})

module.exports = Inventory