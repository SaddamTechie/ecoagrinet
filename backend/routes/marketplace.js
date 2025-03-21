const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getListings, createListing} = require('../controllers/marketplaceController');

router.get('/', getListings);
router.post('/', auth,createListing);

module.exports = router;