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

const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Listing removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

module.exports = { getListings, createListing, deleteListing };