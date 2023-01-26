
const controller = require('./controller')('organization', /*wymiswyu*/{ enabled: false })
// const { authn, authz } = require('../../middleware/authnz-mw')
// const strategies = require('../../authnz/auth')
module.exports = {
    prefixUrl: '/api/v1/tenante',
    routesConfig: [
        {
            method: 'post',
            url: '/id',
            action: controller.getByIdSoft.bind(controller)
        },
        {
            method: 'post',
            url: '/',
            // middlewares: [strategies.authenticate('token-access-collaborator'), authn.tokenCheck],
            action: controller.create.bind(controller)
        },
        {
            method: 'put',
            url: '/',
            // middlewares: [strategies.authenticate('token-access-user'), authn.tokenCheck],
            action: controller.updateSoft.bind(controller)
        },
        {
            method: 'delete',
            url: '/:id',
            // middlewares: [strategies.authenticate('token-access-user'), authn.tokenCheck, authz.scopeCheck([])],
            action: controller.softDel.bind(controller)
        }]
}