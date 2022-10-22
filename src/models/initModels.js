const Closing = require("./closing.model")
const Color = require("./color.model")
const Inventory = require("./inventory.model")
const Invoice = require("./invoice.model")
const OutletItems = require("./outletItems.model")
const Roles = require("./roles.model")
const SumInvoices = require("./sumInvoices.model")
const Users = require("./users.model")

const initModels = () => {

    //? Users -> Roles
    Users.belongsTo(Roles)
    Roles.hasMany(Users)

    //? Inventory -> Color
    Inventory.belongsTo(Color)
    Color.hasMany(Inventory)

    //?Inventory-> outletItems

    Inventory.hasMany(OutletItems)
    OutletItems.belongsTo(Inventory)

    //?Invoice -> outletItems
    Invoice.hasMany(OutletItems)
    OutletItems.belongsTo(Invoice)

    //?Invoice -> SumInvoices
    Invoice.hasMany(SumInvoices)
    SumInvoices.belongsTo(Invoice)

    //? Closing -> SumInvoices
    Closing.hasMany(SumInvoices)
    SumInvoices.belongsTo(Closing)
}

module.exports = initModels