
const { RouteController } = require("@narmy/core")
const { models } = require('../../../db/models')

/*--------------define your new controls--------------------------
class ApiContoller extends RouteController{

    connect(req,res){
        ......
    }
}
-------------------------------------------------------------------*/

module.exports = (collectionName, wymiswyu = null) => {
    return new RouteController(models[collectionName], models.log, wymiswyu)
}