import { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

function CheckIn  () {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [message, setMessage] = useState('');
    const [vehicleData, setVehicleData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/vehicles', { vehicleNumber });
            console.log(response);
            setMessage(
                <div
                  className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                  role="alert"
                >
                  <span className="font-medium">Success!</span> Vehicle checked in successfully! Slot number: {response.data.slot}.
                </div>
              );
            setVehicleData(response.data);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error checking in vehicle';
            setMessage(
                <div
                  className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  <span className="font-medium">Error:</span> {errorMsg}
                </div>
            );
        }
    };

    const generateInvoice = () => {
        if (!vehicleData) return;

        const doc = new jsPDF();
        const date = new Date(vehicleData.entryTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        doc.text(`Vehicle Number: ${vehicleData.vehicleNumber}`, 10, 10);
        doc.text(`Entry Time: ${date}`, 10, 20);
        doc.text(`Slot Number: ${vehicleData.slot}`, 10, 30);
        doc.save('checkin_invoice.pdf');
    };

    return (
        <div className="max-w-md mx-auto  shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="block text-gray-700 text-xl font-bold mb-2">Check In</h2>
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
                Check In
            </button>
        </form>
        {message && <p className="text-red-500 text-xs italic">{message}</p>}
        {vehicleData && <button onClick={generateInvoice} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
            Generate Invoice
        </button>}
        </div>
    );
};

export default CheckIn;
