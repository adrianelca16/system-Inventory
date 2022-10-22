/*
{
        "id": "fafa4304-cc20-44a4-a7a0-f692feafb266",
        "first_name": "string",
        "last_name": "string",
        "email": "example@example.com",
        "password": "$2b$10$iXA47IOGFgFyVBm1yNbUmOAkVeoVYwGsdpJmS3iLJrt5N.ZFDbSBO",
        "phone": "",
        "birthday_date": "DD/MM/YYYY",
        "rol": "admin",
        "profile_image": "",
        "country": "string",
        "is_active": true,
        "verified": false
    }

*/

const {DataTypes} = require('sequelize')
const {db} = require('../utils/database')
const Roles = require('./roles.model')

const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING(30),
        validate: {
            isEmail: true
        },
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            min: 8
        }
    },
    roleId: {
        allowNull: false,
        type: DataTypes.UUID,
        field: 'role_id',
        references:{
            model: Roles,
            key: 'id'
        }
    },
})

module.exports = Users
