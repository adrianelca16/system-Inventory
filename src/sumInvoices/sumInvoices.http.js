const sumInvoicesControllers = require('./sumInvoices.controllers')
const invoicesControllers = require('../Invoice/invoice.controllers')

const getAll = (req, res)=>{
    sumInvoicesControllers.getAllSumInvoices()
    .then(response=>{
        res.status(200).json({items: response.length, SumInvoices: response})
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json(err)
    })
}

const getById = (req, res) => {
    const id = req.params.id
    sumInvoicesControllers.getByIdSumInvoices(id)
    .then(response=>{
        res.status(200).json({items: response.length, SumInvoices: response})
    })
    .catch(err=>{
        res.status(400).json(err)
    })
}

const register = (req, res)=>{
    const fecha = new Date()

    const date = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`

    invoicesControllers.getByDateInvoices(date)
    .then(response => {
        for(let i = 0;  i<response.length; i++){
            let invoicesId = response[i].id
            sumInvoicesControllers.registerSumInvoices(invoicesId)
            .then(response1 => {
                return res.status(200).json()
            })
            .catch(err =>{
                res.status(400).json(err)
            })
        }
    })
    .catch(err => {
        return res.status(400).json(err)
    })
    
}

module.exports = {
    getAll,
    getById,
    register
}