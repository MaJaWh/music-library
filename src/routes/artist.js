const express = require('express');
const artistController = require('../controllers/artists');

const router = express.Router();

router.post('/', artistController.create);

router.get('/', artistController.read);

router.get('/:artistId', artistController.readById);

module.exports = router;
