'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getConversation, sendMessage } = require('../controllers/MessageController');

router.get('/:contactId', getConversation);
router.post('/:receiverId', sendMessage);

module.exports = router;