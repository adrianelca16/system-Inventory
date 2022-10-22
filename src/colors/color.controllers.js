const Color = require('../models/color.model')
const uuid = require('uuid')

const getAllColor = async() => {
    const data = await Color.findAll({
        attributes:{
            exclude: ['createdAt', 'updatedAt']
        }
    })
    return data
}

const getColorId = async(id)=>{
    const data = await Color.findOne({
        where:{
            id: id
        }, 
        attributes: {
            exclude:['createdAt', 'updatedAt']
        }
    })
    return data
}

const createColor = async(body)=>{
    const data = await Color.create({
        id: uuid.v4(),
        name: body.name
    })
    return data
}

const deleteColor = async(id)=>{
    const data = await Color.destroy({where:{
        id: id
    }})
    return data
}

const updateColor = async(id, body, userRol)=>{
    if(userRol == '171a9f56-e893-4e2a-91f3-458e448e2d81'){
        const data = await Color.update(
            {name: body.name},
            {where:{id: id}}
        )
        return data
    }else{
        return false
    }
}
const getByNameColor = async(name)=>{
    const data = await Color.findOne({
        where:{
            name: name
        },
        attributes:{
            exclude:['createdAt', 'updatedAt']
        }
    })
    return data 
}


module.exports = {
    getAllColor,
    getColorId,
    deleteColor,
    createColor,
    updateColor,
    getByNameColor
}