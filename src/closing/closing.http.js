const closingControllers = require('./closing.controllers')
const sumInvoicesControllers = require('../sumInvoices/sumInvoices.controllers')


const getAll = (req, res) => {
    closingControllers.getAllClosing()
    .then(response => {
        res.status(200).json({items: response.length, closing: response})
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const getById = (req, res) => {
    const id = req.params.id

    closingControllers.getByIdClosing(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

const register = (req, res) => {
    const fecha =  new Date

    const date = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()}`

    closingControllers.registerClosing(date)
    .then(response => {
        const closingId = response.id
        sumInvoicesControllers.updateSumInvoices(closingId)
        .then(response1=>{
            closingControllers.getByIdClosing(response.id)
            .then(response2 => {
                const arrayInvoices = response2.sumInvoices
                let fullSalesPrice = 0 
                let gainTotal = 0
                for(let i = 0; i<arrayInvoices.length; i++){
                    fullSalesPrice = arrayInvoices[i].invoice.totalPrice + fullSalesPrice
                    for(let j = 0; j<arrayInvoices[i].invoice.outletItems.length; j++){
                        let gain = (arrayInvoices[i].invoice.outletItems[j].inventory.salePrice - arrayInvoices[i].invoice.outletItems[j].inventory.purchasePrice)*arrayInvoices[i].invoice.outletItems[j].quantity
                        gainTotal = gain + gainTotal
                    }
                }
                closingControllers.updateClosing(closingId, gainTotal, fullSalesPrice)
                .then(response3=>{
                    res.status(200).json(response3)
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
            })
            .catch(err => {
                res.status(400).json(err)
            })
        })
        .catch(err => {
            res.status(400).json(err)
        })
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

module.exports = {
    getAll,
    getById,
    register
}