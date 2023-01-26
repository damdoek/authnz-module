
const { RouteController } = require("@narmy/core")
const { models } = require('../../../db/models')

/*--------------define your new controls--------------------------*/
class UserContoller extends RouteController {

    passwordChange(req) {
        var request = { user: req.user }
        request.payload = {
            // id: req.user._id,
            secret: req.body.secret
        }
        return this.updateSoft(request)
    }
}
/*-------------------------------------------------------------------*/

module.exports = (collectionName, wymiswyu = null) => {
    return new RouteController(models[collectionName], models.log, wymiswyu)
}