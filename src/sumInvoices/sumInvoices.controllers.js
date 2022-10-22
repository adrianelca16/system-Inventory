const SumInvoices = require('../models/sumInvoices.model')
const uuid = require('uuid')
const Invoice = require('../models/invoice.model')
const Closing = require('../models/closing.model')
const OutletItems = require('../models/outletItems.model')
const Inventory = require('../models/inventory.model')
const Color = require('../models/color.model')

const getAllSumInvoices = async () => {
    const data = await SumInvoices.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'invoiceId', 'closingId']
        },include:[
           {
            model: Invoice,
            attributes:{
                exclude:['createdAt', 'updatedAt']
            },
            include:[
                {
                    model: OutletItems,
                    attributes:{
                        exclude:['createdAt', 'updatedAt', 'invoiceId', 'inventoryId']
                    },
                    include:[
                        {
                            model:Inventory,
                            attributes:{
                                exclude:['createdAt', 'updatedAt']
                            },
                            include:[
                                {
                                    model: Color,
                                    attributes:{
                                        exclude:['createdAt', 'updatedAt']
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
           },
           {
            model:Closing,
            attributes:{
                exclude:['createdAt', 'updatedAt']
            }
           }
        ]
    })
    return data
}

const getByIdSumInvoices = async (id) => {
    const data = await SumInvoices.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },include:[
           {
            model: Invoice,
            attributes:{
                exclude:['createdAt', 'updatedAt']
            },
            include:[
                {
                    model: OutletItems,
                    attributes:{
                        exclude:['createdAt', 'updatedAt', 'invoiceId', 'inventoryId']
                    },
                    include:[
                        {
                            model:Inventory,
                            attributes:{
                                exclude:['createdAt', 'updatedAt']
                            },
                            include:[
                                {
                                    model: Color,
                                    attributes:{
                                        exclude:['createdAt', 'updatedAt']
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
           },
           {
            model:Closing,
            attributes:{
                exclude:['createdAt', 'updatedAt']
            }
           }
        ]
    })
    return data
}

const registerSumInvoices = async (invoicesId) => {
    console.log(invoicesId)
    const data = await SumInvoices.create({
        id: uuid.v4(),
        invoiceId: invoicesId,
        closingId: null
    })
    return data
}

const updateSumInvoices = async (closingId) => {
    const data = await SumInvoices.update({
        closingId: closingId
    }, {
        where: {
            closingId: null
        }
    })
    return data
}

module.exports = {
    getAllSumInvoices,
    getByIdSumInvoices,
    registerSumInvoices,
    updateSumInvoices
}