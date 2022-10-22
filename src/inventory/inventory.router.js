const router = require('express').Router()
const passport = require('passport')
require('../middleware/auth.middleware')(passport)
const {roleAdminMiddleware} = require('../middleware/adminRole')

const inventoryServices = require('../inventory/inventory.http')

router.route('/')
    .get(inventoryServices.getAll)
    .post(inventoryServices.register)

router.route('/:id')
    .get(inventoryServices.getById)
    .put(passport.authenticate('jwt', {session:false}), roleAdminMiddleware, inventoryServices.update)
    .delete(inventoryServices.remove)

exports.router = router