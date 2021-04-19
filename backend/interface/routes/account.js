'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const AccountController = require('../controllers/AccountController');

router.get('/', AccountController.listAccounts);
router.get('/role/:role', AccountController.listAccountsByRole);
router.get('/me', AccountController.getSelf);
router.get('/:id', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/:id', AccountController.updateAccount);

module.exports = router;