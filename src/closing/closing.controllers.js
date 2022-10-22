const Closing = require('../models/closing.model')
const uuid = require('uuid')
const SumInvoices = require('../models/sumInvoices.model')
const Invoice = require('../models/invoice.model')
const OutletItems = require('../models/outletItems.model')
const Inventory = require('../models/inventory.model')
const Color = require('../models/color.model')

const getAllClosing = async () => {
    const data = await Closing.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: SumInvoices,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'invoiceId', 'closingId']
                },
                include: [
                    {
                        model: Invoice,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: OutletItems,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt', 'invoiceId', 'inventoryId', 'colorId']
                                },
                                include: [
                                    {
                                        model: Inventory,
                                        attributes: {
                                            exclude: ['createdAt', 'updatedAt', 'colorId']
                                        },
                                        include: [
                                            {
                                                model: Color,
                                                attributes: {
                                                    exclude: ['createdAt', 'updatedAt']
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    return data
}

const getByIdClosing = async (id) => {
    const data = await Closing.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model: SumInvoices,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'invoiceId', 'closingId']
                },
                include: [
                    {
                        model: Invoice,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        },
                        include: [
                            {
                                model: OutletItems,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt', 'invoiceId', 'inventoryId', 'colorId']
                                },
                                include: [
                                    {
                                        model: Inventory,
                                        attributes: {
                                            exclude: ['createdAt', 'updatedAt', 'colorId']
                                        },
                                        include: [
                                            {
                                                model: Color,
                                                attributes: {
                                                    exclude: ['createdAt', 'updatedAt']
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    })
    return data
}

const registerClosing = async (date) => {
    const data = await Closing.create(
        {
            id: uuid.v4(),
            date: date
        }
    )
    return data
}

const updateClosing = async (id, gainTotal, fullSalesPrice) => {
    const data = await Closing.update(
        { 
            gain: gainTotal,
            fullSalesPrice: fullSalesPrice
        },
        { where: { id: id } }
    )
    return data
}

module.exports = {
    getAllClosing,
    getByIdClosing,
    registerClosing,
    updateClosing
}