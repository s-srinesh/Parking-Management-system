import { useState } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import SlotStatus from './SlotStatus';
import FindVehicleSlot from './FindVehicleSlot';
import Slots from './Slots';

const Home = () => {
    const [view, setView] = useState('home');

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Parking Management System</h1>
            {view === 'home' && (
                <div className="space-x-4 flex flex-wrap justify-center">
                    <button 
                        onClick={() => setView('checkin')} 
                        className="m-2 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    >
                        Check In
                    </button>
                    <button 
                        onClick={() => setView('checkout')} 
                        className="m-2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    >
                        Check Out
                    </button>
                    <button 
                        onClick={() => setView('status')} 
                        className="m-2 px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    >
                        Check Slot Status
                    </button>
                    <button 
                        onClick={() => setView('find')} 
                        className="m-2 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        Find Vehicle Slot
                    </button>
                    <button 
                        onClick={() => setView('slots')} 
                        className="m-2 px-6 py-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                    >
                        Slots Available
                    </button>
                </div>
            )}
            {view === 'checkin' && <CheckIn />}
            {view === 'checkout' && <CheckOut />}
            {view === 'status' && <SlotStatus />}
            {view === 'find' && <FindVehicleSlot />}
            {view === 'slots' && <Slots />}
            {view !== 'home' && (
                <button 
                    onClick={() => setView('home')} 
                    className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                >
                    Back
                </button>
            )}
        </div>
    );
};

export default Home;
