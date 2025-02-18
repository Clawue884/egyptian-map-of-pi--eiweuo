const { findNearbyMerchants, getAddressFromCoordinates, searchPlaceByName, geocodeAddress } = require("../services/locationService");

const getNearbyMerchants = async (req, res) => {
  try {
    const { longitude, latitude, radius } = req.query;
    const merchants = await findNearbyMerchants(parseFloat(longitude), parseFloat(latitude), parseInt(radius));
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAddress = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;
    const address = await getAddressFromCoordinates(parseFloat(longitude), parseFloat(latitude));
    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchPlace = async (req, res) => {
  try {
    const { query } = req.query;
    const places = await searchPlaceByName(query);
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const convertAddressToCoords = async (req, res) => {
  try {
    const { address } = req.body;
    const coords = await geocodeAddress(address);
    res.json(coords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getNearbyMerchants, getAddress, searchPlace, convertAddressToCoords };
