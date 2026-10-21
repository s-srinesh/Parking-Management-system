const Vehicle = require('../models/vehicleModel');
const Slot = require('../models/slotModel');
const createVehicle = async (req, res) => {
  console.log(req.body);
  const { vehicleNumber } = req.body;

  if (!vehicleNumber) {
    return res.status(400).json({ message: 'Vehicle number is required' });
  }

  try {
    const existingVehicle = await Vehicle.findOne({ vehicleNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle already exists' });
    }

    // Use atomic update to avoid race conditions
console.log('Finding an available slot...');
const availableSlot = await Slot.findOneAndUpdate(
  { isOccupied: false },
  { isOccupied: true, vehicleNumber },
  { new: true }
);
console.log('Available slot found:', availableSlot);


    if (!availableSlot) {
      return res.status(400).json({ message: 'No available slots' });
    }

    const newVehicle = new Vehicle({
      vehicleNumber,
      slot: availableSlot.slotNumber,
      entryTime: Date.now()  // Make sure to set entryTime here or in model defaults
    });
    await newVehicle.save();

    res.status(201).json(newVehicle);
  } catch (error) {
    console.error('Create Vehicle Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const checkoutVehicle = async (req, res) => {
  const { vehicleNumber } = req.body;

  if (!vehicleNumber) {
    return res.status(400).json({ message: 'Vehicle number is required' });
  }

  try {
    const vehicle = await Vehicle.findOne({ vehicleNumber });
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (vehicle.checkoutTime) {
      return res.status(400).json({ message: 'Vehicle has already checked out' });
    }

    vehicle.checkoutTime = Date.now();

    if (!vehicle.entryTime) {
      return res.status(400).json({ message: 'Vehicle entry time missing' });
    }

    // Calculate duration in hours, round up
    const durationHours = (vehicle.checkoutTime - vehicle.entryTime) / (1000 * 60 * 60);
    const ratePerHour = 10;
    vehicle.fee = Math.ceil(durationHours) * ratePerHour;

    await vehicle.save();

    const slot = await Slot.findOne({ slotNumber: vehicle.slot });
    if (slot) {
      slot.isOccupied = false;
      slot.vehicleNumber = null;
      await slot.save();
    }

    const entryTimeIST = new Date(vehicle.entryTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const checkoutTimeIST = new Date(vehicle.checkoutTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    res.status(200).json({
      vehicleNumber: vehicle.vehicleNumber,
      fee: vehicle.fee,
      slot: vehicle.slot,
      entryTime: entryTimeIST,
      checkoutTime: checkoutTimeIST
    });
  } catch (error) {
    console.error('Checkout Vehicle Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createVehicle, checkoutVehicle };
