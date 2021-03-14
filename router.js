const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const { protect, user } = require('./middlewares/auth')


router.route('/')
    .get(userController.index)
    .post(userController.createUser)


router.route('/user/:id')
    .delete(userController.deleteUser)
    .put(userController.updateUser)


router.route('/login')
    .post(userController.login)


router.route('/me')
    .get(protect.login,userController.loginMe)

    module.exports = router