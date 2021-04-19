'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const AccountController = require('../controllers/AccountController');

router.get('/', AccountController.listAccounts);
router.get('/role/:role', AccountController.listAccountsByRole);
router.get('/account/me', AccountController.getSelf);
router.get('/account/:id', AccountController.getAccount);
router.post('/account/', AccountController.createAccount);
router.delete('/account/:id', AccountController.deleteAccount);
router.put('/account/:id', AccountController.updateAccount);

module.exports = router;