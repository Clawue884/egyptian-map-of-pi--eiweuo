const { locationService } = require("../config/awsConfig");
const axios = require("axios");
const { apiKey } = require("../config/googleMapsConfig");
const Merchant = require("../models/merchantModel");

const findNearbyMerchants = async (longitude, latitude, radius = 5000) => {
  return await Merchant.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: radius,
      },
    },
  });
};

const getAddressFromCoordinates = async (longitude, latitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
    );
    return response.data.results[0]?.formatted_address || "Alamat tidak ditemukan";
  } catch (error) {
    throw new Error("Gagal mendapatkan alamat.");
  }
};

const searchPlaceByName = async (placeName) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${apiKey}`
    );
    return response.data.results.map((place) => ({
      name: place.name,
      location: place.geometry.location,
    }));
  } catch (error) {
    throw new Error("Gagal mencari tempat.");
  }
};

const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    );
    return response.data.results[0]?.geometry.location || null;
  } catch (error) {
    throw new Error("Gagal mengonversi alamat ke koordinat.");
  }
};

module.exports = { findNearbyMerchants, getAddressFromCoordinates, searchPlaceByName, geocodeAddress };
