import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateHousehold, getHousehold } from '../../../services/householdService';
import { getAllResidents } from '../../../services/residentService';
import { getAllVehicles } from '../../../services/vehicleService';

const UpdateHouseHold = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [household, setHousehold] = useState(null);
    const [residents, setResidents] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        HouseHoldMember: [''],
        Area: '',
        HouseHoldHeadID: '',
        Address: '',
        VehicleID: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [householdResponse, residentsResponse, vehiclesResponse] = await Promise.all([
                    getHousehold(id),
                    getAllResidents(),
                    getAllVehicles()
                ]);

                const householdData = householdResponse.houseHold;
                setHousehold(householdData);
                setFormData({
                    HouseHoldMember: householdData.HouseHoldMember || [''],
                    Area: householdData.Area || '',
                    HouseHoldHeadID: householdData.HouseHoldHeadID || '',
                    Address: householdData.Address || '',
                    VehicleID: householdData.VehicleID || []
                });

                setResidents(residentsResponse.residents || []);
                setVehicles(vehiclesResponse.vehicles || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMemberChange = (index, value) => {
        const newMembers = [...formData.HouseHoldMember];
        newMembers[index] = value;
        setFormData(prev => ({
            ...prev,
            HouseHoldMember: newMembers
        }));
    };

    const addMemberField = () => {
        setFormData(prev => ({
            ...prev,
            HouseHoldMember: [...prev.HouseHoldMember, '']
        }));
    };

    const removeMemberField = (index) => {
        const newMembers = formData.HouseHoldMember.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            HouseHoldMember: newMembers
        }));
    };

    const handleVehicleChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            VehicleID: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Filter out empty member fields
            const filteredMembers = formData.HouseHoldMember.filter(member => member.trim() !== '');
            
            const householdData = {
                ...formData,
                HouseHoldMember: filteredMembers,
                Area: parseFloat(formData.Area)
            };

            await updateHousehold(id, householdData);
            navigate('/admin-dashboard/households');
        } catch (err) {
            setError('Failed to update household. Please try again.');
            console.error('Error updating household:', err);
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

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Household</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            name="Address"
                            value={formData.Address}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Area (m²)</label>
                        <input
                            type="number"
                            name="Area"
                            value={formData.Area}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            min="0"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Household Head</label>
                        <select
                            name="HouseHoldHeadID"
                            value={formData.HouseHoldHeadID}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Chọn chủ hộ (không bắt buộc)</option>
                            {residents.map(resident => (
                                <option key={resident._id} value={resident._id}>
                                    {resident.Name}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-sm text-gray-500">Có thể để trống và cập nhật sau</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Household Members</label>
                        {formData.HouseHoldMember.map((member, index) => (
                            <div key={index} className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    value={member}
                                    onChange={(e) => handleMemberChange(index, e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder={`Member ${index + 1}`}
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMemberField(index)}
                                        className="px-3 py-2 text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMemberField}
                            className="mt-2 text-blue-600 hover:text-blue-800"
                        >
                            + Add Member
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vehicles</label>
                        <select
                            multiple
                            name="VehicleID"
                            value={formData.VehicleID}
                            onChange={handleVehicleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            size="4"
                        >
                            {vehicles.map(vehicle => (
                                <option key={vehicle._id} value={vehicle._id}>
                                    {vehicle.VehicleType} - {vehicle.LicensePlate}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple vehicles</p>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin-dashboard/households')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Update Household
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateHouseHold;
