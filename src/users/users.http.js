

const userControllers = require('../users/users.controllers')

const getAll = (req, res) => {
    userControllers.getAllUsers()
        .then(response => {
            return res.status(200).json({items: response.length, users: response})
        })
        .catch(err => {
            return res.status(400).json(err)
        })
   
}

const getUsersById = (req,res) =>{
    const id = req.params.id
    userControllers.getUsersById(id)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(err => {
            return res.status(404).json({message: `The user with the id ${id} does not exist`})
        })
}
const register = (req, res)=> {
    const body = req.body
    if(!body){
        return res.status(400).json({message: 'Missing data'})
    }
    else if(
        !body.name ||
        !body.email ||
        !body.password
    ){
        return res.status(400).json({message: 'All fields must be completed', fields:{
            name: 'string',
            email: 'example@example.com',
            password: 'string'
        } })
    }else{
        userControllers.createUsers(body)
        .then(response => {
            return res.status(201).json({message: `User created succesfully wuth id: ${response.id}`, user: response})
        })
        .catch(err => {
            return res.status(400).json({message: err})
        })
        
    }
}

const remove = (req,res)=>{
    const id = req.params.id
    userControllers.deleteUser(id)
    .then(response => {
        if(response){
            return res.status(204).json({message: 'delete sucessfully'})
        }else{
            return res.status(400).json({message: 'invalid id'})
        }
    })
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body

    if(!Object.keys(data)){
        return res.status(400).json({message: 'Missing data'})
    }else if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.roleId){
            return res.status(400).json({message: 'All fields must be completed', fields:{
                name: 'string',
                email: 'example@example.com',
                phone: '+5804241333286',
                roleId: 'uuid'
            } })
    } else {
        userControllers.updateUser(id, data)
        .then(response=>{
            return res.status(200).json({message: 'User edit succesfully', user: response})
        })
        .catch(err=>{
            return res.status(400).json({message: err})
        })   
    }
}

const editMyUser = (req, res) => {
    const id = req.user.id
    const data = req.body
    const userRol = req.user.rol
    if(!Object.keys(data)){
        return res.status(400).json({message: 'Missing data'})
    }else if (
        !data.name ||
        !data.email){
            return res.status(400).json({message: 'All fields must be completed', fields:{
                name: 'string',
                email: 'example@example.com'
            }})
    } else {
        response = userControllers.updateUser(id, data, userRol)
        .then(response=>{
            return res.status(200).json({message: 'User edit succesfully', user: response})
        })
        .catch(err=>{
            return res.status(400).json({message: err})
        })
    }
}

const deleteMyUser = (req, res) => {
    const id = req.user.id
    userControllers.deleteUser(id)
    .then(response=>{
        return res.status(204).json(response)
    })
    .catch(err => {
        return res.status(400).json({message: 'Invalid Id'})
    }) 
}

const getMyUser = (req, res) => {
    const id = req.user.id
    userControllers.getUsersById(id)
    .then(response => {
        return res.status(200).json(response)
    })
    .catch(err=> {
        return res.status(404).json({message: `El usuario con el id ${id} no existe`})
    })
}

const postProfileImg = (req,res) => {
    const userId = req.user.id
    const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename

    userControllers.editprofileImage(userId, imgPath)
    .then(response=>{
        return res.status(200).json(response)
    })
    .catch(err => {
        return res.status(400).json({message: err})
    })
}

module.exports = {
    getAll,
    getUsersById,
    register,
    remove,
    edit,
    editMyUser,
    deleteMyUser,
    getMyUser,
    postProfileImg
}