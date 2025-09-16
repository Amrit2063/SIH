const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: true,
      unique: true,
    },
    stops: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;