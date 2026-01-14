const express = require('express')
const router = express.Router()
const controller = require('../controller/con-quote')

router.get('/', controller.scroll_get)
router.get('/create', controller.create_get)
router.post('/create', controller.create_post)
router.post('/delete:id', controller.delete_post)

module.exports = router