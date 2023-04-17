const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')

routes.get('/registration', UserController.getAll)
routes.get('/registration/:email', UserController.getByEmail)
routes.post('/registration', UserController.addUser)

module.exports = routes