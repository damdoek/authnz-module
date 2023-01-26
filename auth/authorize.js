const { token } = require('../const')
const { verifyUserToken } = require('../utils/authFn')

const strategies = () => {
    return {

        authorizeRealm: async (realm, scopes, token) => {
            try {
                var payload = parseToken(token)
                var realms = payload.scopes
                var targetRealm = realms.filter(r => r.realmId == realm)
                if (targetRealm) {
                    targetRealm.scopes.map(scope => {
                        if (scope in scopes) {
                            return true
                        }
                        return false;
                    })
                    return false;
                }
            }
            catch (err) {
                console.log(err)
                return false;
            }
        },
    }
}

module.exports = strategies

