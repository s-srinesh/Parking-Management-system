import { useState } from 'react';
import axios from 'axios';

const FindVehicleSlot = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [slot, setSlot] = useState(null);
    const [error, setError] = useState('');

    const handleFind = async () => {
        try {
            const response = await axios.get(`/api/slots/find/${vehicleNumber}`);
            setSlot(response.data.slotNumber);
            setError('');
        } catch (error) {
            setError('Vehicle not found');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-gray-700 text-xl font-bold mb-2">Find Vehicle Slot</h2>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
            onClick={handleFind}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
            Find Slot
        </button>
        {slot && <p className="mt-2">Slot Number: <span className="font-semibold">{slot}</span></p>}
    </div>
);
}

export default FindVehicleSlot;
