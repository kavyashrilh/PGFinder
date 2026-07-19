const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    default: "India",
  },

  facilities: [
    {
      type: String,
    },
  ],

  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },

  available: {
    type: Boolean,
    default: true,
  },
    geometry: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;