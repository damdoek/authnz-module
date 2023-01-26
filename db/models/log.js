const { action } = require('../../const').log
module.exports = (mongo) => {
    const schema = mongo.Schema

    var log = new schema({
        type: { type: String, required: true },
        traget_id: { type: schema.ObjectId },
        table: { type: String, required: true },
        value: { type: String },
        action: {
            type: String, required: true, enum: [
                action.CREATE,
                action.DELETE,
                action.UPDATE,
                action.SIGNIN,
                action.SIGNOUT,
                action.UPLOAD,
                action.DESTROY,
                action.TOKEN_AUTH,
                action.TOKEN_REFRESH
                ,
            ]
        },
        userId: { type: schema.ObjectId, ref: 'user', autopopulate: true }
    }, {
        timestamps: true
    })
    log.index({ "createdAt": 1 }, { expireAfterSeconds: 15778800 });
    return mongo.model('log', log)
}