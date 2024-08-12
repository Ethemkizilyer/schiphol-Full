const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const flightRoutes = require('./routes/flights.js');
app.use('/api/flights', flightRoutes);

// Sunucu başlatma
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
