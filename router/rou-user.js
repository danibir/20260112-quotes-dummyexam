
const express = require('express')
const router = express.Router()
const controller = require('../controller/con-user')

router.get('/profile:user', controller.profile_get)
router.get('/login', controller.login_get)
router.post('/login', controller.login_post)
router.get('/sign-up', controller.signup_get)
router.post('/sign-up', controller.signup_post)
router.get('/log-out', controller.logout_get)
router.post('/delete-user', controller.deleteUser_post)
router.get('/quotes:user', controller.userQuotes_get)

module.exports = router