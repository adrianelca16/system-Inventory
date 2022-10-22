const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')
const Inventary = require('./inventory.model')
const Invoice = require('./invoice.model')

const OutletItems = db.define('outletItem',{
    id:{
        primaryKey:true,
        allowNull: false,
        type: DataTypes.UUID
    },
    inventoryId:{
        allowNull:false,
        type: DataTypes.UUID,
        field: 'inventary_id',
        references:{
            model: Inventary,
            key: 'id'
        }
        
    },
    quantity:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    invoiceId: {
        type: DataTypes.UUID,
        field: 'invoice_id',
        references:{
            model: Invoice,
            key: 'id'
        }
    },
    totalPrice:{
        allowNull:false,
        type: DataTypes.FLOAT,
        field: 'total_price'
    }
})

module.exports = OutletItems