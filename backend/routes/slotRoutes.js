const express = require('express');
const router = express.Router();
const Slot = require('../models/slotModel');
const Vehicle = require('../models/vehicleModel');
router.post('/initialize', async (req, res) => {
    const { slotCount } = req.body;
    console.log(slotCount)
    if (!slotCount) {
        return res.status(400).json({ message: 'Slot count is required' });
    }
    try {
        for (let i = 1; i <= slotCount; i++) {
            const slot = new Slot({ slotNumber: i });
            await slot.save();
        }
        res.status(201).json({ message: 'Slots initialized' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.delete('/deleteslots', async (req, res) => {
    try {
        await Slot.deleteMany();
        res.status(200).json({ message: 'All slots deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

router.get('/status', async (req, res) => {
    try {
        const totalSlots = await Slot.countDocuments();
        const occupiedSlots = await Slot.countDocuments({isOccupied: true });
        const remainingSlots = totalSlots - occupiedSlots;
        res.status(200).json({ totalSlots, occupiedSlots, remainingSlots });
    } catch (error) {
        res.status(500).json({ message: 'Error getting slot status' });
    }
});

router.get('/find/:vehicleNumber', async (req, res) => {
    try {
        const vehicle = await Vehicle.findOne({ vehicleNumber: req.params.vehicleNumber });
        if (vehicle) {
            const slot = await Slot.findOne({ slotNumber: vehicle.slot, isOccupied: true });
            if (slot) {
                res.status(200).json({ slotNumber: slot.slotNumber });
            } else {
                res.status(404).json({ message: 'Slot not found or not occupied' });
            }
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error finding vehicle slot', error });
    }
});



module.exports = router;
