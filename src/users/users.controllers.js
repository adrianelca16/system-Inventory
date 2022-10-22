const uuid = require('uuid')
const { hashPassword, comparePassword } = require('../utils/crypt')

const Users = require('../models/users.model')
const Roles = require('../models/roles.model')

const getAllUsers = async () => {
    const data = await Users.findAll({
        attributes: {
            exclude: ['password', 'roleId', 'createdAt', 'updatedAt']
        }
    })
    return data
    //? select * from users;
}

const getUsersById = async (id) => {
    const data = await Users.findOne({
        where: {
            id: id
        },
        attributes: {
            exclude: ['password', 'roleId', 'createdAt', 'updatedAt']
        },
        include: {
            model: Roles,
            attributes:{
                exclude: ['createdAt', 'updatedAt', 'id']
            }
        }
    })
    return data
    //? select * from users where id = ${id};
}

const createUsers = async (data) => {
    const newUser = await Users.create({
        ...data,
        id: uuid.v4(),
        password: hashPassword(data.password),
        roleId: '7a2c9171-0fa9-4a26-9105-0c5f126b9112'
    })
    return newUser
}

const deleteUser = async (id) => {
    const data = await Users.destroy({
        where: {
            id
        }
    })
    return data
}

const updateUser = async (userId, data, userRol) => {
    if (userRol === '171a9f56-e893-4e2a-91f3-458e448e2d81') {
        const { password, id, ...newData } = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response
    } else {
        const { password, id, roleId, ...newData } = data
        const response = await Users.update({
            ...newData
        }, {
            where: {
                id: userId
            }
        })
        return response
    }
}

const getUserByEmail = async (email) => {
    const data = await Users.findOne({
        where: {
            email: email
        }
    })
    return data
    //? select * from users where email = ${email};
}

const editprofileImage = async (userId, imgUrl) => {
    const response = await Users.update({
        profile_image: imgUrl
    }, {
        where: {
            id: userId
        }
    })
    return response
}

module.exports = {
    getAllUsers,
    getUsersById,
    createUsers,
    deleteUser,
    updateUser,
    getUserByEmail,
    editprofileImage
}