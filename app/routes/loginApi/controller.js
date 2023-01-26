
const { RouteController } = require("@narmy/core")
const { models } = require('../../../db/models')
const cipher = require('../../../utils/cipher')
const { genUserToken } = require('../../../utils/authFn')
const { TOKEN_REFRESH, TOKEN_AUTH, SIGNIN } = require('../../../const').log.action
/*--------------define your new controls--------------------------*/
class LoginContoller extends RouteController {

    signin(req) {
        var data = req.user
        this.setLogOpt({ ...this.LOG_OPT, action: SIGNIN, target_id: data.id })
        return { data, success: true, options: this.LOG_OPT }
    }
    resetPass(req) {

    }

    auth(req) {
        var data = req.user
        console.log(data)
        this.setLogOpt({ ...this.LOG_OPT, action: TOKEN_AUTH, target_id: data.id })
        return { data: { id: data._id, sub: data.sub }, success: true, options: this.LOG_OPT }
    }

    refresh(req) {
        var st_r_r = cipher.randomString().split('').reverse().join('')
        var request = {
            body: {
                id: req.user._id,
                data: { st_r_r }
            },
            user: req.user
        }

        // request {payload, user}
        return _refresh(request, this)

    }


}
/*-------------------------------------------------------------------*/

module.exports = (collectionName, wymiswyu = null) => {
    return new LoginContoller(models[collectionName], models.log, wymiswyu)
}


const _refresh = async (request, _t) => {
    console.log(request)
    try {
        var user = (await _t.updateSoft(request)).data
        _t.setLogOpt({ ..._t.LOG_OPT, action: TOKEN_REFRESH, target_id: request.body.id })
        var token = genUserToken(user)
        return { data: { id: user._id, token }, success: true, options: _t.LOG_OPT }
    } catch (err) {
        return { err, success: false, options: _t.LOG_OPT }
    }
}