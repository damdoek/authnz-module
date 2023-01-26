const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const util = require('util')

const cipher = {
    genHash: (data, salt, mode = "sha256") => {
        var hash = crypto.createHmac(mode, salt)
        return hash.update(data).digest('hex')
    },

    syncHash: (hash, payload, salt) => {
        return cipher.genHash(payload, salt) == hash
    },

    randomString: () => {
        return (Math.random() * 10000000).toString(36)//.substr(2, 18)
    },

    jwtParse: (token) => { return token },

    jwtVerify: (token, jwtSecret, opt = {}) => {
        var options = { clockTolerance: 15 }
        options = { ...options, ...opt }
        try {
            return jwt.verify(token, jwtSecret, options)
        }
        catch (err) {
            console.log(err)
            throw err
        }
    },

    jwtSign: (payload, jwtSecret, opt = {}) => {
        var options = { expiresIn: 900, algorithm: 'RS256' }
        options = { ...options, ...opt }
        try {
            return jwt.sign(payload, jwtSecret, options)
        }
        catch (err) {
            console.log(err)
            throw err
        }
    },

    genKeyPair: (mode = 'rsa', opt = rsaOpt) => {
        var digest = util.promisify(crypto.generateKeyPair)
        opt.privateKeyEncoding.passphrase = cipher.randomString()
        return { gk: digest(mode, opt), sk: opt.privateKeyEncoding.passphrase }
    },

    encrypt: (payload, pbk, padding = crypto.constants.RSA_PKCS1_PADDING) => {
        return crypto.publicEncrypt(
            {
                key: pbk,
                padding: padding,
            },
            // We convert the data string to a buffer using `Buffer.from`
            Buffer.from(payload)
        ).toString('base64');
    },

    decrypt: (encrypted, prk, passphrase = null, padding = crypto.constants.RSA_PKCS1_PADDING) => {
        const buff = Buffer.from(encrypted, 'base64')
        return crypto.privateDecrypt(
            {
                key: prk,
                padding: padding,
                passphrase: passphrase
            },
            // We convert the data string to a buffer using `Buffer.from`
            buff
        ).toString()
    }
}

const rsaOpt = {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
    }
}

module.exports = cipher