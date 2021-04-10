'use strict';

const express = require('express'),
      router = express.Router({ mergeParams: true });
//Controller
const { getMagazine, createMagazine, deleteMagazine, listMagazines} = require('../controllers/MagazineController');

router.get('/:magazineId', getMagazine);
router.post('/', createMagazine);
router.delete('/:magazineId', deleteMagazine);
router.get('/', listMagazines);

module.exports = router;