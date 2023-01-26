var mongoose = require('mongoose');
// var assert = require('assert');

mongoose.set('debug', true);

var deviceLogSchema = mongoose.Schema({
    "userId": { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    "deviceUID": { type: String },
    "type": { type: String },
    "hardwareInfo": { type: String },
    "osInfo": { type: String },
    "secret": { type: String },
    "ipConn": { type: String },
    "failure": { type: Boolean },
    "failureCode": { type: String },
}, {
    "timestamps": true
})