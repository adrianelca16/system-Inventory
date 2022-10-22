const Roles = require("../models/roles.model")

const roleAdminMiddleware = async(req, res, next) => {
    await Roles.findOne({
        where: {
            name: 'admin'
        }
    }).then((response => {
        const rol = req.user.rol
        console.log(rol)
        if (rol === response.id) {
            next()
        } else {
           
            return res.status(401).json({ status: 'error', message: 'user not authorized' })
        }
    })).catch(() => { return res.status(401).json({ status: 'error', message: 'user not authorizeddd' }) })
}

exports.roleAdminMiddleware = roleAdminMiddleware