const express = require('express');
const router = express.Router();
const { getTweets } = require('../controllers/X');

// נתיב לשליפת ציוצים לפי שם משתמש
router.get('/tweets/:username', getTweets);

module.exports = router;
