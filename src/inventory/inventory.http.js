const colorControllers = require('../colors/color.controllers')
const inventoryControllers = require('./inventory.controllers')

const getAll = (req, res) => {
    inventoryControllers.getAllInventory()
        .then(response => {
            return res.status(200).json({ items: response.length, inventory: response })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const getById = (req, res) => {
    const id = req.params.id
    inventoryControllers.getByIdInventory(id)
        .then(response => {
            return res.status(200).json({ inventory: response })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const remove = (req, res) => {
    const id = req.params.id
    inventoryControllers.deleteInventory(id)
        .then(response => {
            return res.staus(204).json({ message: 'the inventory delete successfully' })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const register = (req, res) => {
    const body = req.body
    const nameColor = req.body.color
    if (!body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !body.name ||
        !body.quantity ||
        !body.purchase_price ||
        !body.sale_price ||
        !body.color
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string',
                quantity: 'number (1)',
                purchase_price: 'float (1.00)',
                sale_price: 'float (1.00)',
                color: 'string (blue)'
            }
        })
    } else {
        colorControllers.getByNameColor(nameColor)
            .then(respon => {
                inventoryControllers.registerInventory(body, respon.id)
                    .then(response => {
                        return res.status(201).json({ message: `Inventory created succesfully wuth id: ${response.id}`, inventory: response })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json({ message: err })
                    })
            })
            .catch(err => {
                return res.status(400).json({ message: err })
            })

    }
}

const update = (req, res) => {
    const id = req.params.id
    const userRol = req.user.rol
    const body = req.body
    if (!body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (
        !body.name ||
        !body.quantity ||
        !body.purchase_price ||
        !body.sale_price
    ) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string',
                quantity: 'number (1)',
                purhase_price: 'float (1.00)',
                sale_price: 'float (1.00)'
            }
        })
    } else {
        inventoryControllers.updateInventory(id, body, userRol)
            .then(response => {
                inventoryControllers.getByIdInventory(id)
                    .then(responseId => {
                        return res.status(201).json({ message: 'Inventory edit succesfully', color: responseId })
                    })
                    .catch(errId => {
                        return res.status(400).json({ message: errId })
                    })
            })
            .catch(err => {
                return res.status(400).json({ message: err })
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