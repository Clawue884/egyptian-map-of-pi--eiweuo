const { locationService } = require("../config/awsConfig");

const createGeofenceCollection = async () => {
  await locationService.createGeofenceCollection({
    CollectionName: "PetaPiGeofences",
  }).promise();
};

const addGeofence = async (name, longitude, latitude, radius) => {
  await locationService.putGeofence({
    CollectionName: "PetaPiGeofences",
    GeofenceId: name,
    Geometry: {
      Polygon: [[[longitude - 0.01, latitude - 0.01], [longitude + 0.01, latitude + 0.01]]],
    },
  }).promise();
};

module.exports = { createGeofenceCollection, addGeofence };
