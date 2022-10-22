const router = require('express').Router()
const colorServices = require('./color.http')
const passport = require('passport')
const {roleAdminMiddleware} = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)

router.route('/')
    .get(colorServices.getAll)
    .post(colorServices.register)

router.route('/:id')
    .get(colorServices.getById)
    .put(passport.authenticate('jwt', {session: false}),roleAdminMiddleware,colorServices.update)
    .delete(colorServices.remove)

    exports.router = router