const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')

const Closing = db.define('closing', {
    id:{
        allowNull:false,
        type: DataTypes.UUID,
        primaryKey:true
    },
    date:{
        allowNull:false,
        type:DataTypes.DATEONLY
    },
    gain:{
        type: DataTypes.FLOAT
    },
    fullSalesPrice:{
        type:DataTypes.FLOAT,
        field: 'full_sales_price'
    }
})

module.exports = Closing