'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const AccountController = require('../controllers/AccountController');

router.get('/', AccountController.listAccounts);
router.get('/', AccountController.getSelf);
router.get('/:id', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/:id', AccountController.updateAccount);

module.exports = router;