var mongoose = require('mongoose');


module.exports = (mongo) => {

    const schema = mongo.Schema

    const location = new schema({
        address: { type: String },
        geoloc: {
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }

    })

    var tenante = mongoose.Schema({
        "tenantName": { type: String },
        // "type": { type: String },
        "secret": { type: String },
        // "logo": { type: String },
        // "website": { type: Boolean },
        // "slug": { type: String },
        // "area": { type: String },
        // "location": { type: location },
        "owner": { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
    }, {
        "timestamps": true
    })

    return mongo.model('tenante', tenante)
}