const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  flightNumber: { type: Number, required: true },
  flightName: { type: String, required: true },
  airlineCode: { type: String, required: true },
  aircraftType: { 
    iataMain: { type: String }, 
    iataSub: { type: String } 
  },
  route: { 
    destinations: [String], 
    eu: { type: String }, 
    visa: { type: Boolean }
  },
  scheduleDate: { type: Date, required: true },
  scheduleDateTime: { type: Date, required: true },
  scheduleTime: { type: String, required: true },
  actualLandingTime: { type: Date }, 
  estimatedLandingTime: { type: Date },
  expectedTimeOnBelt: { type: Date },
  terminal: { type: Number },
  publicFlightState: { flightStates: [String] },
  isOperationalFlight: { type: Boolean },
  lastUpdatedAt: { type: Date }, 
  serviceType: { type: String },
  baggageClaim: {
    belts: [String]}
});

const Flight = mongoose.model('Flight', FlightSchema);

module.exports = Flight;
