
//*******user API********/
const { RouteBuilder } = require('@narmy/core')
const userRoutesConfig = require('./userApi/api')
const loginRoutesConfig = require('./loginApi/api')
const express = require('express')
const userRouter = express.Router()
const loginRouter = express.Router()
const userApi = new RouteBuilder(userRouter, userRoutesConfig)
const loginApi = new RouteBuilder(loginRouter, loginRoutesConfig)

module.exports = {
    userApi, loginApi
}
