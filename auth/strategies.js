
const BearerStrategy = require('passport-http-bearer').Strategy
const localStrategy = require('passport-local').Strategy
const { TYPE_REFRESH, TYPE_ACCESS } = require("../const").token
exports.login_local_strategy = (model) => {
    const { jwtUserSignInWithPass } = require('./authenticate')(model)

    return new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'secret'
        },
        async function (email, secret, done) {
            let result = await jwtUserSignInWithPass(email, secret)

            return done(...result)
        }
    )


}

exports.access_token_strategy = (model) => {
    const { jwtUserTokenAuth } = require('./authenticate')(model)

    return new BearerStrategy(
        async function (token, done) {
            let result = await jwtUserTokenAuth(token, TYPE_ACCESS)
            // console.log(result)
            return done(...result) // done(result[0], result[1])
        }
    )


}

exports.refresh_token_strategy = (model) => {
    const { jwtUserTokenAuth } = require('./authenticate')(model)

    return new BearerStrategy(
        async function (token, done) {
            let result = await jwtUserTokenAuth(token, TYPE_REFRESH)
            // console.log(result)
            return done(...result) // done(result[0], result[1])
        }
    )
}