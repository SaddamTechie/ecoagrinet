const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getListings,createListing,updateListing,deleteListing} = require("../controllers/marketplaceController")

router.get('/', getListings);
router.post('/', auth, createListing);
router.put('/:id', auth, updateListing);
router.delete('/:id', auth, deleteListing);

module.exports = router;