const mongoose = require('mongoose')

var user = require('./users')(mongoose)
var tenante = require('./tenantes')(mongoose)
var log = require('./log')(mongoose)


exports.models = {
    user, log, tenante
}
