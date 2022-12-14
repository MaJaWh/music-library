const express = require('express');
const artistController = require('../controllers/artists');

const router = express.Router();

router.post('/', artistController.create);

router.post('/:artistId/album', artistController.album)

router.get('/', artistController.read);

router.get('/:artistId', artistController.readById);

router.patch('/:artistId', artistController.update);

module.exports = router;
