const outletItemsControllers = require('./outletItems.controllers')
const inventoryControllers = require('../inventory/inventory.controllers')
const colorController = require('../colors/color.controllers')


const getAll = (req, res) => {
    outletItemsControllers.getAllOutleltItems()
        .then(response => {
            return res.status(200).json({ item: response.length, outletItems: response })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const getById = (req, res) => {
    const id = req.params.id
    outletItemsControllers.getByIdOutleltItems(id)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(err => {
            return res.status(400).json({ message: 'Invalid Id' })
        })
}

const register = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({ message: 'Missing data' })
    } else if (!body.quantity) {
        return res.status(400).json({
            message: 'All fields must be completed', fields: {
                name: 'string(pulsera)',
                quantity: 'number (1)',
                color: 'string(blue)'
            }
        })
    } else {
        colorController.getByNameColor(body.color)
            .then(response1 => {
                inventoryControllers.getByNameInventory(body.name, response1.id)
                    .then(response => {
                        outletItemsControllers.registerOutletItems(response.id, body, response.salePrice)
                            .then(respon => {
                                return res.status(200).json(respon)
                            })
                            .catch(err => {
                                return res.status(400).json({ message: err })
                            })
                    })
                    .catch(err => {
                        return res.status(400).json({ message: err })
                    })
            })

    }
}


module.exports = {
    getAll,
    getById,
    register
}