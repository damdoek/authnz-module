
const controller = require('./controller')('user', /*wymiswyu*/{ enabled: false })
// const { authn, authz } = require('../../middleware/authnz-mw')
const strategies = require('../../passport')

module.exports = {
    prefixUrl: '/api/v1/login',
    routesConfig: [
        {
            method: 'post',
            url: '/signin',
            middlewares: [strategies.authenticate('user-local-login')],
            action: controller.signin.bind(controller)
        },
        {
            method: 'get',
            url: '/auth',
            middlewares: [strategies.authenticate('access-token-auth')],
            action: controller.auth.bind(controller)
        },
        {
            method: 'get',
            url: '/refresh',
            middlewares: [strategies.authenticate('refresh-token-auth')],
            action: controller.refresh.bind(controller)
        },
        {
            method: 'post',
            url: '/reset',
            // middlewares: [strategies.authenticate('token-access-user'), authn.tokenCheck],
            action: controller.resetPass.bind(controller)
        }]
}