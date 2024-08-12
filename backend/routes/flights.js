const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const Flight = require('../models/Flight');

router.get('/schiphol-flights', async (req, res) => {
  try {
    const params = {
      sort: req.query.sort,
      flightDirection: req.query.flightDirection,
      flightNumber: req.query.flightNumber,
      scheduleDate: req.query.departureDate,
      origin: req.query.origin,
      destination: req.query.destination,
      status: req.query.status,
      airline: req.query.airline,
      fromDateTime: req.query.fromDateTime,
      toDateTime: req.query.toDateTime,
      searchDateTimeField: req.query.searchDateTimeField,
    };

    // Boş olan parametreleri kaldırmak için
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });
console.log("params",params)
    const response = await axios.get('https://api.schiphol.nl/public-flights/flights', {
      headers: {
        'ResourceVersion': 'v4',
        'app_id': process.env.SCHIPHOL_APP_ID,
        'app_key': process.env.SCHIPHOL_APP_KEY,
      },
      params: params,
    });

    console.log("API Response Data:", response.data);

    res.json({ flights: response.data.flights });
  } catch (error) {
    console.error('Error fetching flights from Schiphol API:', error);
    res.status(500).json({ message: 'Error fetching flights' });
  }
});

// Tüm uçuşları getr MongoDB'den
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/book-flight', async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ message: 'Flight ID is required' });
    }
  
    try {
      const existingFlight = await Flight.findOne({ id });
  
      if (existingFlight) {
        return res.status(400).json({ message: 'This flight has already been booked.' });
      }
  
      const flight = new Flight(req.body);
      const newFlight = await flight.save();
      res.status(201).json({ success: true, flight: newFlight });
    } catch (error) {
      console.error('Error saving flight:', error);
      res.status(400).json({ message: error.message });
    }
  });
  
  

// My-Book page
router.get('/my-flights', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json({ flights });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
