import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVehicles, deleteVehicle } from '../../../services/vehicleService';
import { getAllResidents } from '../../../services/residentService';
import { FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const VehicleList = () => {
    const navigate = useNavigate();
    // Add role and dashboardPrefix logic
    const role = localStorage.getItem("accountRole")?.toLowerCase() || "resident";
    const dashboardPrefix = role === "leader" ? "/leader-dashboard" : "/admin-dashboard";

    const [vehicles, setVehicles] = useState([]);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [households, setHouseholds] = useState([]);
    const [alert, setAlert] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
    const [ownerFilter, setOwnerFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vehiclesResponse, residentsResponse] = await Promise.all([
                    getAllVehicles(),
                    getAllResidents()
                ]);
                setVehicles(vehiclesResponse.vehicles);
                setResidents(residentsResponse.residents || []);
                setHouseholds(residentsResponse.households || []);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getResidentName = (householdId) => {
        const resident = residents.find(res => 
            res.HouseHoldID && res.HouseHoldID.includes(householdId)
        );
        return resident ? resident.Name : 'N/A';
    };

    const handleDelete = async (id) => {
        const vehicleToDelete = vehicles.find(v => v._id === id);
        if (!vehicleToDelete) return;

        // Kiểm tra xem phương tiện có thuộc hộ gia đình nào không
        const relatedHouseholds = households.filter(h => 
            h.VehicleID && h.VehicleID.includes(id)
        );

        const confirmMessage = `Bạn có chắc chắn muốn xóa phương tiện này?\n` +
            `- Loại phương tiện: ${vehicleToDelete.VehicleType}\n` +
            `- Biển số xe: ${vehicleToDelete.LicensePlate}\n` +
            `- Chủ sở hữu: ${vehicleToDelete.OwnerID ? residents.find(r => r._id === vehicleToDelete.OwnerID)?.Name : 'N/A'}\n\n` +
            `Lưu ý: Việc xóa sẽ ảnh hưởng đến:\n` +
            `1. Thông tin phương tiện trong hộ gia đình liên quan\n` +
            `2. Lịch sử đăng ký phương tiện\n` +
            `Bạn có muốn tiếp tục không?`;

        if (window.confirm(confirmMessage)) {
            try {
                await deleteVehicle(id);
                // Refresh danh sách sau khi xóa
                const response = await getAllVehicles();
                setVehicles(response.vehicles);
                setAlert({
                    type: 'success',
                    message: `Đã xóa phương tiện ${vehicleToDelete.LicensePlate} và cập nhật thông tin liên quan!`
                });
            } catch (err) {
                console.error('Error deleting vehicle:', err);
                setAlert({
                    type: 'error',
                    message: 'Xóa phương tiện thất bại. Vui lòng thử lại.'
                });
            }
        }
    };

    // Filter vehicles based on search term and filters
    const filteredVehicles = vehicles.filter(vehicle => {
        const matchesSearch = vehicle.LicensePlate.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = vehicleTypeFilter === 'all' || vehicle.VehicleType === vehicleTypeFilter;
        const ownerName = getResidentName(vehicle.HouseHoldID);
        const matchesOwner = ownerFilter === 'all' || ownerName === ownerFilter;
        
        return matchesSearch && matchesType && matchesOwner;
    });

    // Get unique vehicle types for filter
    const vehicleTypes = ['all', ...new Set(vehicles.map(v => v.VehicleType))];

    // Get unique owners for filter
    const owners = ['all', ...new Set(vehicles.map(v => getResidentName(v.HouseHoldID)))];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Vehicle List</h1>
                <button
                    onClick={() => navigate(`${dashboardPrefix}/vehicles/create`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add New Vehicle
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            {alert && (
                <div className={`bg-${alert.type === 'success' ? 'green' : 'red'}-100 border border-${alert.type === 'success' ? 'green' : 'red'}-400 text-${alert.type === 'success' ? 'green' : 'red'}-700 px-4 py-3 rounded relative mb-4`} role="alert">
                    <span className="block sm:inline">{alert.message}</span>
                </div>
            )}

            {/* Search and Filter Section */}
            <div className="mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by License Plate..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="p-2 border rounded-lg hover:bg-gray-100"
                        title="Show Filters"
                    >
                        <FaFilter className="text-gray-600" />
                    </button>
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="mt-4 p-4 bg-white border rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                                <select
                                    value={vehicleTypeFilter}
                                    onChange={(e) => setVehicleTypeFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {vehicleTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type === 'all' ? 'All Types' : type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                                <select
                                    value={ownerFilter}
                                    onChange={(e) => setOwnerFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {owners.map(owner => (
                                        <option key={owner} value={owner}>
                                            {owner === 'all' ? 'All Owners' : owner}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                License Plate
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vehicle Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Owner
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredVehicles.map((vehicle) => (
                            <tr key={vehicle._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {vehicle.LicensePlate}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {vehicle.VehicleType}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getResidentName(vehicle.HouseHoldID)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => navigate(`${dashboardPrefix}/vehicles/edit/${vehicle._id}`)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        <FaEdit className="inline-block" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash className="inline-block" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VehicleList;
