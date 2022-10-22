const Inventory = require('../models/inventory.model')
const uuid = require('uuid')
const Color = require('../models/color.model')


const getAllInventory = async() =>{
    const data = await Inventory.findAll({
        include:{
            model: Color,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes:{
            exclude:['createdAt', 'updatedAt', 'colorId']
        }
    })
    return data
}
const getByIdInventory = async(id)=>{
    const data = await Inventory.findOne({
        where:{
            id: id
        },
        include:{
            model: Color,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes:{
            exclude:['createdAt', 'updatedAt', 'colorId']
        }
    })
    return data
}

const registerInventory = async(body, colorId) => {
    const data = await Inventory.create({
        id: uuid.v4(),
        name: body.name,
        quantity: body.quantity,
        colorId: colorId,
        purchasePrice: body.purchase_price,
        salePrice: body.sale_price})
    return data
}

const deleteInventory = async(id) => {
    const data = await Inventory.destroy({
        where:{
            id: id
        }
    })
    return data
}

const updateInventory = async(id, data, userRol) => {
    if(userRol == '171a9f56-e893-4e2a-91f3-458e448e2d81'){
        const { id, ...newData} = data
        const body = await Inventory.update({
            ...newData
        }, {
            where:{
                id:id,
            },
        })
        return body
    }else{
        return false
    }
}

const getByNameInventory = async(name, colorId)=>{
    const data = await Inventory.findOne({
        where:{
            name: name,
            colorId: colorId
        },
        include:{
            model: Color,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        },
        attributes:{
            exclude:['createdAt', 'updatedAt', 'colorId']
        } 
    })
    return data
}

const updateInventortByInvoice = async(id, quantity)=>{
    const data = await Inventory.update({
        quantity: quantity
    },{
        where:{id:id}
    })
    return data
}

module.exports = {
    getAllInventory,
    getByIdInventory,
    registerInventory,
    updateInventory,
    deleteInventory,
    getByNameInventory,
    updateInventortByInvoice
}