const express = require('express')
const router = express.Router()
const twitterController = require('../controllers/twitter')

router.get('/latest-tweet', twitterController.showLatestTweet)
router.post('/latest-tweet', twitterController.showLatestTweet)
router.get('/config', twitterController.getUsernames)
router.post('/config/add', twitterController.addUsername)
router.post('/config/remove', twitterController.removeUsername)

module.exports = router