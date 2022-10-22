const colorControllers = require('./color.controllers')

const getAll = (req, res)=>{
    colorControllers.getAllColor()
    .then(response => {
        return res.status(200).json({items: response.length, Colors: response})
    })
    .catch(err => {
        return res.status(400).json({message: err})
    })
}

const getById = (req, res)=>{
    const id = req.params.id
    colorControllers.getColorId(id)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(err => {
        return res.status(400).json({message: `the colors with the id ${id} does not exist`})
    })
}

const remove = (req, res) => {
    const id = req.params.id
    colorControllers.deleteColor(id)
    .then(response => {
        return res.status(204).json({message: 'delete successfully',  response})
    })
    .catch(err => {
        return res.status(400).json({message: `the colors with the id ${id} does not exist`})
    })
}

const register = (req, res) =>{
    const body = req.body
    if(!body){
        return res.status(400).json({message: 'Missing data'})
    }else if (!body.name){
        return res.status(400).json({message: 'All fields must be completed', fields:{
            name: 'string'
        } })
    } else {
        colorControllers.createColor(body)
        .then(response => {
            return res.status(201).json({message: `Color created succesfully wuth id: ${response.id}`, color: response})
        })
        .catch(err => {
            return res.status(400).json({message: err})
        })
    }
}

const update = (req, res) => {
    const id = req.params.id
    const userRol = req.user.rol
    const body = req.body
    if(!body){
        return res.status(400).json({message: 'Missing data'})
    }else if (!body.name){
        return res.status(400).json({message: 'All fields must be completed', fields:{
            name: 'string'
        } })
    } else {
        colorControllers.updateColor(id,body, userRol)
        .then(response => {
            colorControllers.getColorId(id)
            .then(responseId => {
                return res.status(201).json({message: 'Color edit succesfully', color: responseId})
            })
        })
        .catch(err => {
            return res.status(400).json({message: err})
        })
    }
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    update
}