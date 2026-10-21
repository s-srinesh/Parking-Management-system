import  { useState } from 'react';
import axios from 'axios';

const SlotStatus = () => {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState('');

    const fetchStatus = async () => {
        try {
            const response = await axios.get('/api/slots/status');
            setStatus(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching slot status');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Slot Status</h2>
            <button onClick={fetchStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Check Slot Status
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {status && (
                <div className="mt-4">
                    <p>Total Slots: <span className="font-semibold">{status.totalSlots}</span></p>
                    <p>Occupied Slots: <span className="font-semibold">{status.occupiedSlots}</span></p>
                    <p>Remaining Slots: <span className="font-semibold">{status.remainingSlots}</span></p>
                </div>
            )}
        </div>
    );
};

export default SlotStatus;
