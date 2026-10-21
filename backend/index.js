const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const vehicleRoutes = require('./routes/vehicleRoutes');
const slotRoutes = require('./routes/slotRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/slots', slotRoutes);

// Health check endpoint for monitoring & CI/CD
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/parking';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to MongoDB at ${mongoURI}`);
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
