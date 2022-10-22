const router = require('express').Router()
const closingServices = require('./closing.http')


router.route('/')
    .get(closingServices.getAll)
    .post(closingServices.register)

router.route('/:id')
    .get(closingServices.getById)

exports.router = router