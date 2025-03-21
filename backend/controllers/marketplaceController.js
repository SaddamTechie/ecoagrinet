const Listing = require('../models/Listing');

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('user', 'name');
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createListing = async (req, res) => {
  const { title, description, price } = req.body;
  try {
    const listing = new Listing({ user: req.user.id, title, description, price });
    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateListing = async (req, res) => {
  const { title, description, price } = req.body;
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ msg: 'Listing not found' });
    if (listing.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.price = price || listing.price;
    await listing.save();
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ msg: 'Listing not found' });
    if (listing.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    await listing.deleteOne();
    res.json({ msg: 'Listing deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = { getListings,createListing,updateListing,deleteListing}