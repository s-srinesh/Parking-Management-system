const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    slotNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    isOccupied: {
        type: Boolean,
        default: false,
    },
      vehicleNumber: { type: String, default: null }

});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
