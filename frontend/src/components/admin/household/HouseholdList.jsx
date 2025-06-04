import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllHouseholds, deleteHousehold } from '../../../services/householdService';
import { getAllResidents } from '../../../services/residentService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const HouseholdList = () => {
    const [households, setHouseholds] = useState([]);
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ type: '', message: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [householdsResponse, residentsResponse] = await Promise.all([
                    getAllHouseholds(),
                    getAllResidents()
                ]);
                setHouseholds(householdsResponse.houseHolds);
                setResidents(residentsResponse.residents || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data. Please try again later.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/admin-dashboard/households/${id}`);
    };

    const handleEdit = (id) => {
        navigate(`/admin-dashboard/households/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const householdToDelete = households.find(h => h._id === id);
        if (!householdToDelete) return;

        const confirmMessage = `Bạn có chắc chắn muốn xóa hộ gia đình này?\n` +
            `- Địa chỉ: ${householdToDelete.Address}\n` +
            `- Số thành viên: ${householdToDelete.HouseHoldMember?.length || 0}\n` +
            `- Số phương tiện: ${householdToDelete.VehicleID?.length || 0}\n\n` +
            `Lưu ý: Việc xóa sẽ ảnh hưởng đến:\n` +
            `1. Thông tin của các thành viên trong hộ gia đình\n` +
            `2. Các phương tiện đăng ký thuộc hộ gia đình\n` +
            `3. Tài khoản của các thành viên\n` +
            `Bạn có muốn tiếp tục không?`;

        if (window.confirm(confirmMessage)) {
            try {
                // Xóa hộ gia đình và các thành phần liên quan
                await deleteHousehold(id);
                
                // Refresh danh sách sau khi xóa
                const response = await getAllHouseholds();
                setHouseholds(response.houseHolds);
                
                setAlert({
                    type: 'success',
                    message: `Đã xóa hộ gia đình ${householdToDelete.Address} và cập nhật thông tin liên quan!`
                });
            } catch (err) {
                console.error('Error deleting household:', err);
                setAlert({
                    type: 'error',
                    message: 'Xóa hộ gia đình thất bại. Vui lòng thử lại.'
                });
            }
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Household List</h1>
                <button
                    onClick={() => navigate('/admin-dashboard/households/create')}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Household
                </button>
            </div>

            {households.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No households found.</p>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    STT
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Area (m²)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Household Head
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Members
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vehicles
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {households.map((household, index) => (
                                <tr key={household._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {household.Address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {household.Area}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {household.HouseHoldHeadID ? (
                                            <span className="text-green-600">
                                                {residents.find(r => r._id === household.HouseHoldHeadID)?.Name || 'N/A'}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 italic">Chưa có chủ hộ</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {household.HouseHoldMember?.length || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {household.VehicleID?.length || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEdit(household._id)}
                                                className="text-yellow-600 hover:text-yellow-900"
                                                title="Edit"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(household._id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <FaTrash className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default HouseholdList;
