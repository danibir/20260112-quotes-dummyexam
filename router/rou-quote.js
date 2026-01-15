const express = require('express')
const router = express.Router()
const controller = require('../controller/con-quote')
const auth = require('../middleware/mid-auth')

router.get('/', controller.scroll_get)
router.get('/create', auth.authenticate, controller.create_get)
router.post('/create', auth.authenticate, controller.create_post)
router.post('/delete:id', auth.authenticate, controller.delete_post)

module.exports = router