var cipher = require('./cipher')
var { token } = require('../const')

module.exports = {

    passwordSync: (pass, user) => {
        return cipher.syncHash(user.password, pass, user._id.toString())
    },
    genUserToken: (user) => {
        var prk = Buffer.from(user.prk.split('').reverse().join('').substr(2), 'base64').toString()
        var passphrase = user.st_r_c.split('').reverse().join('')
        var profile = user.profile.personalInfo
        delete profile.birthDay

        accessToken = cipher.jwtSign(
            { _id: user._id, type: token.TYPE_ACCESS, scopes: user.realms },
            { key: prk, passphrase },
            {
                subject: user.email,
                jwtid: user[token.TYPE_ACCESS].split('').reverse().join(''),
                issuer: 'clica'
            })

        var payload = {
            _id: user._id,
            profile,
            type: token.TYPE_REFRESH
        }

        refreshToken = cipher.jwtSign(
            payload,
            { key: prk, passphrase },
            {
                subject: user.email,
                jwtid: user[token.TYPE_REFRESH].split('').reverse().join(''),
                issuer: 'clica',
                expiresIn: '30d'
            })
        return { accessToken, refreshToken }
    },
    verifyUserToken: (token, user, type, opt = {}) => {
        var pbk = Buffer.from(user.pbk.split('').reverse().join('').substr(2), 'base64').toString()
        return cipher.jwtVerify(token, pbk, { subject: user.email, jwtid: user[type].split('').reverse().join(''), issuer: 'clica', ...opt })
    },
    parseToken: (token) => {
        var payload = Buffer.from(token.split('.')[1], 'base64').toString()
        console.log(payload)
        return JSON.parse(payload)
    }
}

