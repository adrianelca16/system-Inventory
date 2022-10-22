const Inventory = require('../models/inventory.model')
const Invoice = require('../models/invoice.model')
const OutletItems = require('../models/outletItems.model')
const uuid = require('uuid')
const Color = require('../models/color.model')


const getAllOutleltItems = async () => {
    const data = await OutletItems.findAndCountAll({
        include: [
            {
                model: Invoice,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Inventory,
                include: [
                    {
                        model: Color,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['colorId', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'inventoryId', 'invoiceId']
        }
    })
    return data
}

const getByIdOutleltItems = async (id) => {
    const data = await OutletItems.findOne({
        where: {
            id: id
        },
        include: [
            {
                model: Invoice,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            },
            {
                model: Inventory,
                include: [
                    {
                        model: Color,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['colorId', 'createdAt', 'updatedAt']
                }
            }
        ],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'inventoryId', 'invoiceId']
        }
    })
    return data
}

const registerOutletItems = async (inventoryId, body, priceProduct) => {
    const data = await OutletItems.create({
        id: uuid.v4(),
        inventoryId: inventoryId,
        quantity: body.quantity,
        totalPrice: priceProduct * body.quantity
    })
    return data
}

const updateOutlelItems = async (invoiceId) => {
    const data = await OutletItems.update(
        {
            invoiceId: invoiceId
        }, {
        where: {
            invoiceId: null
        }
    }
    )
    return data
}

const getByInvoice = async (invoiceId) => {
    const data = await OutletItems.findAll({ where: { invoiceId: invoiceId } })
    return data
}

module.exports = {
    getAllOutleltItems,
    getByIdOutleltItems,
    registerOutletItems,
    updateOutlelItems,
    getByInvoice
}
