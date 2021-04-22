'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
const { verifyAccessToken } = require('../controllers/AuthorizationController');
//Controller
const { getMagazine, createMagazine, deleteMagazine, listMagazines, updateMagazine, downloadSelectedContributions} = require('../controllers/MagazineController');

router.get('/:magazineId/download/selected', downloadSelectedContributions);
router.get('/', verifyAccessToken, listMagazines);
router.get('/:magazineId', verifyAccessToken, getMagazine);
router.post('/', verifyAccessToken, createMagazine);
router.put('/:magazineId', verifyAccessToken, updateMagazine);
router.delete('/:magazineId', verifyAccessToken, deleteMagazine);
module.exports = router;