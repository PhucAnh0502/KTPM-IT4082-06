import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createVehicle } from '../../../services/vehicleService';
import { getAllResidents } from '../../../services/residentService';

const CreateVehicle = () => {
    const navigate = useNavigate();
    // Add role and dashboardPrefix logic
    const role = localStorage.getItem("accountRole")?.toLowerCase() || "resident";
    const dashboardPrefix = role === "leader" ? "/leader-dashboard" : "/admin-dashboard";

    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        LicensePlate: '',
        VehicleType: '',
        HouseHoldID: '',
        Status: 'Active'
    });

    const vehicleTypes = ["Car", "Motorcycle"];

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const response = await getAllResidents();
                setResidents(response.residents || []);
            } catch (err) {
                setError('Failed to fetch residents. Please try again.');
                console.error('Error fetching residents:', err);
            }
        };

        fetchResidents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await createVehicle(formData);
            navigate(`${dashboardPrefix}/vehicles`);
        } catch (err) {
            setError('Failed to create vehicle. Please try again.');
            console.error('Error creating vehicle:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Vehicle</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">License Plate</label>
                        <input
                            type="text"
                            name="LicensePlate"
                            value={formData.LicensePlate}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                        <select
                            name="VehicleType"
                            value={formData.VehicleType}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select vehicle type</option>
                            {vehicleTypes.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner</label>
                        <select
                            name="HouseHoldID"
                            value={formData.HouseHoldID}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select owner</option>
                            {residents
                                .filter(resident => resident.HouseHoldID && resident.HouseHoldID.length > 0)
                                .map(resident => (
                                    <option key={resident._id} value={resident.HouseHoldID[0]}>
                                        {resident.Name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`${dashboardPrefix}/vehicles`)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Create Vehicle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateVehicle;