import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getResident, updateResident } from '../../../services/residentService';
import { getAllHouseholds } from '../../../services/householdService';

const UpdateResident = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // Add role and dashboardPrefix logic
    const role = localStorage.getItem("accountRole")?.toLowerCase() || "resident";
    const dashboardPrefix = role === "leader" ? "/leader-dashboard" : "/admin-dashboard";

    const [households, setHouseholds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        Name: '',
        CID: '',
        DateOfBirth: '',
        Gender: '',
        HouseHoldID: [],
        Occupation: '',
        Status: 'Permanent',
        PhoneNumber: '',
        HouseHoldRelation: ''
    });

    const statusOptions = [
        'Temporary',
        'Permanent',
        'Moved',
        'Dead'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [residentResponse, householdsResponse] = await Promise.all([
                    getResident(id),
                    getAllHouseholds()
                ]);

                if (residentResponse) {
                    const residentData = residentResponse.resident;
                    setFormData({
                        Name: residentData.Name || '',
                        CID: residentData.CID || '',
                        DateOfBirth: residentData.DateOfBirth ? new Date(residentData.DateOfBirth).toISOString().split('T')[0] : '',
                        Gender: residentData.Gender || '',
                        HouseHoldID: residentData.HouseHoldID || [],
                        Occupation: residentData.Occupation || '',
                        Status: residentData.Status || 'Permanent',
                        PhoneNumber: residentData.PhoneNumber || '',
                        HouseHoldRelation: residentData.HouseHoldRelation || ''
                    });
                }

                if (householdsResponse) {
                    setHouseholds(householdsResponse.houseHolds || []);
                }
            } catch (err) {
                setError('Failed to fetch resident data. Please try again.');
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

    const handleHouseholdChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFormData(prev => ({
            ...prev,
            HouseHoldID: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await updateResident(id, formData);
            navigate(`${dashboardPrefix}/residents`);
        } catch (err) {
            setError('Failed to update resident. Please try again.');
            console.error('Error updating resident:', err);
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
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Resident</h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">CID</label>
                        <input
                            type="text"
                            name="CID"
                            value={formData.CID}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="DateOfBirth"
                            value={formData.DateOfBirth}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="Gender"
                            value={formData.Gender}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Households</label>
                        <select
                            multiple
                            name="HouseHoldID"
                            value={formData.HouseHoldID}
                            onChange={handleHouseholdChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            size="4"
                        >
                            {households.map(household => (
                                <option key={household._id} value={household._id}>
                                    {household.Address}
                                </option>
                            ))}
                        </select>
                        <p className="mt-1 text-sm text-gray-500">Hold Ctrl (Windows) or Command (Mac) to select multiple households</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Occupation</label>
                        <input
                            type="text"
                            name="Occupation"
                            value={formData.Occupation}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="Status"
                            value={formData.Status}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            name="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">HouseholdHead Relation</label>
                        <input
                            type="text"
                            name="HouseHoldRelation"
                            value={formData.HouseHoldRelation}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`${dashboardPrefix}/residents`)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Update Resident
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateResident;
