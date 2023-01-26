
const cipher = require('../../utils/cipher')


module.exports = (mongo) => {

    const schema = mongo.Schema

    var mfaSchema = new schema({
        "type": { type: String },
        "enabled": { type: String, default: false },
        "secret": { type: String },
    })

    var addressSchema = new schema({
        "zipcode": { type: String },
        "city": { type: String },
        "area": { type: String },
        "street": { type: String },
    })

    var profileSchema = new schema({
        "personalInfo": {
            "first_name": { type: String },
            "surname": { type: String },
            "birthDay": { type: String },
            "displayName": { type: String },
            "address": [{ type: addressSchema }],
            "lang": { type: String }
        },
        "securitySettings": {
            "mfa": { type: mfaSchema },
            "allowedDeviceOnly": { type: Boolean, default: false },
            "allowedDevice": [{ type: String }], // device UID
            "allowedApp": [{ type: String }],
        },
        "privacy": {
            "showEmail": { type: Boolean },
            "showBirthDay": { type: Boolean },
        }
    }, {
        "timestamps": true
    })


    var realm = new schema({
        realmId: { type: mongo.Types.ObjectId, ref: 'tenante' },
        scopes: [{ type: String, enum: [] }]
    })


    var user = new schema({
        "phone": { type: String, unique: true },
        "email": { type: String, unique: true },
        "password": { type: String },
        "profile": {
            type: profileSchema, default: {}, required: true
        },
        emailVerified: { type: Boolean },
        phoneVerified: { type: Boolean },
        emailVerifiedAt: { type: Date },
        phoneVerifiedAt: { type: Date },
        disabled: { type: Boolean },
        deleted: { type: Boolean },
        st_r_r: { type: String },
        st_r_a: { type: String },
        st_r_c: { type: String },
        pbk: { type: String },
        prk: { type: String },
        realms: [{ type: realm }]
    }, {
        "timestamps": true
    });





    user.pre('save', async function () {
        console.log(this._id.toString())
        var { gk, sk } = cipher.genKeyPair()
        var { publicKey, privateKey } = await gk
        this.pbk = Buffer.from(publicKey).toString('base64').split('').reverse().join('') + '=='
        this.prk = Buffer.from(privateKey).toString('base64').split('').reverse().join('') + '=='
        this.st_r_c = sk.split('').reverse().join('')
        this.password = cipher.genHash(this.password, this._id.toString())
        this.st_r_a = cipher.randomString().split('').reverse().join('')
        this.st_r_r = cipher.randomString().split('').reverse().join('')
        this.phone = cipher.encrypt(this.phone, publicKey).split('').reverse().join('') + '=='
    })

    user.pre('findOneAndUpdate', function () {
        this.st_r_a = cipher.randomString().split('').reverse().join('')
    })

    return mongo.model('user', user)
}