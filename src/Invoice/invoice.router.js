const router = require('express').Router()
const invoiceServices = require('./invoice.http')
const {roleAdminMiddleware} = require('../middleware/adminRole')


router.route('/')
    .get(invoiceServices.getAll)
    .post(invoiceServices.register)

router.route('/:id')
    .get(invoiceServices.getById)
    .delete(roleAdminMiddleware,invoiceServices.getById)
    .put(invoiceServices.update)


exports.router = router