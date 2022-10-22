const invoiceControllers = require('./invoice.controllers')
const outletItemsControllers = require('../outletItems/outletItems.controllers')
const inventoryControllers = require('../inventory/inventory.controllers')

const getAll = (req, res) => {
    invoiceControllers.getAllInvoices()
        .then(response => {
            return res.status(200).json({ item: response.length, invoice: response })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const getById = (req, res) => {
    const id = req.params.id

    invoiceControllers.getByIdInvoice(id)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(err => {
            return res.status(400).json({ message: 'Invalid Id' })
        })
}

const remove = (req, res) => {
    const id = req.params.id
    invoiceControllers.deleteInvoice(id)
        .then(response => {
            return res.status(204).json({ message: `Invoice with ${id} delete successfully` })
        })
        .catch(err => {
            return res.status(400).json({ message: err })
        })
}

const register = (req, res) => {
    const fecha = new Date()
    const hour = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}}`
    const date = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`

    invoiceControllers.registerInvoice(hour, date)
        .then(response1 => {
            outletItemsControllers.updateOutlelItems(response1.id)
                .then(response2 => {
                    outletItemsControllers.getByInvoice(response1.id)
                        .then(response3 => {
                            let priceTotal = 0
                            for (let i = 0; i < response3.length; i++) {
                                let totalPrice = response3[i].totalPrice
                                priceTotal = totalPrice + priceTotal
                            }
                            invoiceControllers.editInvoice(priceTotal)
                            .then(response4 =>{
                                
                               for(let i = 0; i<response3.length; i++){
                                    let id = response3[i].inventoryId
                                    let quantity = response3[i].quantity
                                    inventoryControllers.getByIdInventory(id)
                                    .then(response5 => {
                                        if((response5.quantity - quantity) >= 0){
                                            quantity = response5.quantity - quantity
                                            inventoryControllers.updateInventortByInvoice(id, quantity)
                                            .then(response6 =>{
                                                res.status(200).json()
                                            })
                                            .catch(err=>{
                                                res.status(400).json(err)
                                            })
                                        }
                                    })
                                    .catch(err=>{
                                        return res.status(400).json(err)
                                    })
                                }
                                return res.status(201).json({ response3 })
                            })
                            .catch(err=>{
                                return res.status(400).json(err)
                            })
                        })
                        .catch(err => {
                            return res.status(400).json(err)
                        })
                })
                .catch(err => {
                    return res.status(400).json(err)
                })
        })
        .catch(err => {
            return res.status(400).json(err)
        })
}

const update = (req, res) => {
    invoiceControllers.editInvoice()
        .then(response => {
            return res.status(200).json({ message: 'exits' })
        })
}

module.exports = {
    getAll,
    getById,
    remove,
    register,
    update
}