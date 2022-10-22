const {DataTypes} = require('sequelize')

const {db} = require('../utils/database')
const Closing = require('./closing.model')
const Invoice = require('./invoice.model')

const SumInvoices = db.define('sumInvoices', {
    id:{
        allowNull:false,
        type: DataTypes.UUID,
        primaryKey:true
    },
    invoiceId:{
        type: DataTypes.UUID,
        references:{
            model: Invoice,
            key: 'id'
        }, 
        field: 'invoice_id'
    },
    closingId:{
        type: DataTypes.UUID,
        references:{
            model: Closing,
            key: 'id'
        }, 
        field: 'closing_id'
    }
})

module.exports = SumInvoices