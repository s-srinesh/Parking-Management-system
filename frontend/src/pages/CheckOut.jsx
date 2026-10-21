import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const CheckOut = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [message, setMessage] = useState("");
  const [vehicleData, setVehicleData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "/api/vehicles/checkout",
        { vehicleNumber }
      );
      if (response.data) {
        setMessage(
          <div
            className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">Success!</span> Vehicle checked out
            successfully! Fee: ${response.data.fee}.
          </div>
        );
        setVehicleData(response.data);
      } else {
        setMessage("Invalid data received from server");
      }
    } catch (error) {
      console.error("Error checking out vehicle:", error);
      setMessage("Error checking out vehicle");
    }
  };

  const generateInvoice = () => {
    if (!vehicleData) return;

    const doc = new jsPDF();
    doc.text(`Vehicle Number: ${vehicleData.vehicleNumber}`, 10, 10);
    doc.text(`Entry Time: ${vehicleData.entryTime}`, 10, 20);
    doc.text(`Exit Time: ${vehicleData.checkoutTime}`, 10, 30);
    doc.text(`Slot Number: ${vehicleData.slot}`, 10, 40);
    doc.text(`Fee: $${vehicleData.fee}`, 10, 50);
    doc.save("checkout_invoice.pdf");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-xl font-bold mb-2">Check Out</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
        >
          Check Out
        </button>
      </form>
      {message && <p className="text-red-500 text-xs italic">{message}</p>}
      {vehicleData && (
        <button
          onClick={generateInvoice}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Generate Invoice
        </button>
      )}
    </div>
  );
};

export default CheckOut;
