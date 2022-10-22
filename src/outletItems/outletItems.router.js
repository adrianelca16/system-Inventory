const outletItemsServices = require('./outletItems.http')
const router =require('express').Router()

router.route('/')
    .get(outletItemsServices.getAll)
    .post(outletItemsServices.register)

router.route('/:id')
    .get(outletItemsServices.getById)

exports.router = router