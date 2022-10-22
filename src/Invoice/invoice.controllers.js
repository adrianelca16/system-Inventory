const Invoice = require('../models/invoice.model')
const uuid = require('uuid')
const OutletItems = require('../models/outletItems.model')
const Inventory = require('../models/inventory.model')
const Color = require('../models/color.model')

const getAllInvoices = async()=>{
    const data= await Invoice.findAll({
        attributes:{
            exclude:['createdAt', 'updatedAt']
        },
        include:[
            {
                model: OutletItems,
                attributes:{
                    exclude:['createdAt', 'updatedAt', 'invoiceId']
                },
                include:[
                    {
                        model: Inventory,
                        attributes:{
                            exclude:['createdAt', 'updatedAt', "colorId"]
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
    })
    return data
}

const getByIdInvoice = async(id)=>{
    const data = await Invoice.findOne({
        where:{
            id:id
        },
        attributes:{
            exclude:['createdAt', 'updatedAt']
        },
        include:[
            {
                model: OutletItems,
                attributes:{
                    exclude:['createdAt', 'updatedAt', 'invoiceId']
                },
                include:[
                    {
                        model: Inventory,
                        attributes:{
                            exclude:['createdAt', 'updatedAt', "colorId"]
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
    })
    return data
}

const deleteInvoice = async(id)=>{
    const data = await Invoice.destroy({
        where: {
            id: id
        }
    })
    return data
}

const registerInvoice = async(hour, date)=>{
    const data = await Invoice.create({
        id: uuid.v4(),
        date: date,
        hour: hour
    })
    return data
}

const editInvoice = async(totalPrice)=>{
    const data = await Invoice.update({totalPrice: totalPrice}, {where:{totalPrice: null}})

    return data
}

const getByDateInvoices = async(date)=>{
    const data = await Invoice.findAll({
        where:{
            date: date
        }
    })
    return data
}

module.exports = {
    getAllInvoices,
    getByIdInvoice,
    deleteInvoice,
    registerInvoice,
    editInvoice,
    getByDateInvoices
}