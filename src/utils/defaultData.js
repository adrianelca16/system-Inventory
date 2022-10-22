const Color = require('../models/color.model')
const Inventory = require('../models/inventory.model')
const Invoice = require('../models/invoice.model')
const Roles = require('../models/roles.model')
const Users = require('../models/users.model')


const generateData = async() => {
    await Roles.bulkCreate([
        {name: 'admin', id: '171a9f56-e893-4e2a-91f3-458e448e2d81'}, 
        {name: 'normal', id: '7a2c9171-0fa9-4a26-9105-0c5f126b9112'}], 
        {validate: true})

    await Users.create({
        id:'d00e895a-4d14-461f-bbf2-0ffb13a29601',
        name: 'Brenda',
        email: 'brenda@gmail.com',
        password: '$2b$10$iXA47IOGFgFyVBm1yNbUmOAkVeoVYwGsdpJmS3iLJrt5N.ZFDbSBO',
        roleId: '171a9f56-e893-4e2a-91f3-458e448e2d81'
    })
    await Color.bulkCreate([
        {id: '3cd37705-8233-4b3a-80b7-5e388972ae03',name: 'blue'},
        {id: '5f2fb70f-c325-4b83-97d9-6e6d1c4ce5f9',name: 'red'}
    ], {validate: true})

}

module.exports = generateData