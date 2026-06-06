const express = require('express');
const router = express.Router();

const {
  verifyWebhook,
  receiveWebhook
} = require('../controllers/webhookController.js');

router.get('/', verifyWebhook);
router.post('/', receiveWebhook);

module.exports = router;