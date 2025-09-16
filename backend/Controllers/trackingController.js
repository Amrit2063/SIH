const Location = require('../models/Location');
const locationSchema = require('../schemas/locationSchema');

exports.updateLocation = async (req, res) => {
  const { error } = locationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { bus, latitude, longitude } = req.body;

  try {
    let location = await Location.findOne({ bus });
    if (location) {
      location.latitude = latitude;
      location.longitude = longitude;
      location.updatedAt = Date.now();
      await location.save();
    } else {
      location = await Location.create({ bus, latitude, longitude });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLocationByBus = async (req, res) => {
  try {
    const busId = req.params.busId;
    const location = await Location.findOne({ bus: busId }).populate('bus', 'busNumber route');
    if (!location) return res.status(404).json({ message: 'Location not found for this bus' });
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};