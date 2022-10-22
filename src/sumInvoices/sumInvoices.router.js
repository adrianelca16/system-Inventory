const router = require('express').Router()
const sumInvoicesServices = require('./sumInvoices.http')

router.route('/')
    .get(sumInvoicesServices.getAll)
    .post(sumInvoicesServices.register)

router.route('/:id') 
    .get(sumInvoicesServices.getById)

exports.router = router