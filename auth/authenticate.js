const { token } = require('../const')
const { verifyUserToken, genUserToken, passwordSync, parseToken } = require('../utils/authFn')

const strategies = (model) => {
    console.log(model)
    return {

        jwtUserTokenAuth: async (token, type) => {
            try {
                var payload = parseToken(token)
            } catch (err) {
                return err
            }

            var user = await model.findOne({ _id: payload._id, email: payload.sub }).select('-secret')
            if (!user) return "user not found"
            if (user.disabled) return "user disabled"
            if (user.deleted) return "user has been deleted"
            // if (!user.emailVerified) return "user not verified"
            // if (!user.phoneVerified) return "user not verified"
            try {
                var verification = verifyUserToken(token, user, type)
                return [verification ? null : false, verification];
            }
            catch (err) {
                return [err, false]
            }
        },

        jwtUserSignInWithPass: async (email, password) => {
            var user = await model.findOne({ email: email }).select("-secret")
            if (!user) return "user not found"
            if (user.disabled) return "user disabled"
            if (user.deleted) return "user has been deleted"
            // if (!user.emailVerified) return "user not verified"
            // if (!user.phoneVerified) return "user not verified"

            try {
                var verify = passwordSync(password, user)
                if (verify) {
                    return [null, { id: user._id, tokens: genUserToken(user) }]
                }
                return [false, verify]
            } catch (err) {
                console.log(err)
                return [err, false]
            }

        },

        jwtUserSignInWithOTP: async (email) => {

        }
    }
}

module.exports = strategies