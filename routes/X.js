const express = require('express');
const router = express.Router();
const { getTweets } = require('../controllers/X');

// ���� ������ ������ ��� �� �����
router.get('/tweets/:username', getTweets);

module.exports = router;
