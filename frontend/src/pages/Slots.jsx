import { useState } from 'react';
import axios from 'axios';

const Slots = () => {
    const [slotNumber, setSlotNumber] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');

    const handleaddSlot = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/slots/initialize', {slotNumber});
            setMessage(
                <div
                  className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span className="font-medium">Success!</span> Slots added successfully!.
                </div>
              );
            setError('');
        } catch (error) {
            setError('Error initializing slot');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-gray-700 text-xl font-bold mb-2">Enter Slot number</h2>
        {message}
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Slot Number"
            value={slotNumber}
            onChange={(e) => setSlotNumber(e.target.value)}
            required
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <button
            onClick={handleaddSlot}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
            Add Slot
        </button>
    </div>
);
}

export default Slots;
