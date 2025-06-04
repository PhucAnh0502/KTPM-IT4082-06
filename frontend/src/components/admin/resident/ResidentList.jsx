import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllResidents, deleteResident } from '../../../services/residentService';
import { getAllHouseholds } from '../../../services/householdService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ResidentList = () => {
    const navigate = useNavigate();
    const [residents, setResidents] = useState([]);
    const [households, setHouseholds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);

    // Add role and dashboardPrefix logic
    const role = localStorage.getItem("accountRole")?.toLowerCase() || "resident";
    const dashboardPrefix = role === "leader" ? "/leader-dashboard" : "/admin-dashboard";
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [residentsResponse, householdsResponse] = await Promise.all([
                    getAllResidents(),
                    getAllHouseholds()
                ]);
                setResidents(residentsResponse.residents || []);
                setHouseholds(householdsResponse.houseHolds || []);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (id) => {
        navigate(`${dashboardPrefix}/residents/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const residentToDelete = residents.find(r => r._id === id);
        if (!residentToDelete) return;

        // Kiểm tra xem cư dân có thuộc hộ gia đình nào không
        const relatedHouseholds = households.filter(h => 
            (h.HouseHoldMember && h.HouseHoldMember.includes(id)) ||
            h.HouseHoldHeadID === id
        );

        const confirmMessage = `Bạn có chắc chắn muốn xóa cư dân này?\n` +
            `- Họ tên: ${residentToDelete.Name}\n` +
            `- Số điện thoại: ${residentToDelete.PhoneNumber}\n` +
            `Lưu ý: Việc xóa sẽ ảnh hưởng đến:\n` +
            `1. Thông tin cư dân trong hộ gia đình liên quan\n` +
            `2. Tài khoản của cư dân\n` +
            `3. Các phương tiện đăng ký của cư dân\n` +
            (relatedHouseholds.length > 0 ? `4. Các hộ gia đình mà cư dân là chủ hộ sẽ bị xóa thông tin chủ hộ\n` : '') +
            `Bạn có muốn tiếp tục không?`;

        if (window.confirm(confirmMessage)) {
            try {
                await deleteResident(id);
                // Refresh danh sách sau khi xóa
                const [residentsResponse, householdsResponse] = await Promise.all([
                    getAllResidents(),
                    getAllHouseholds()
                ]);
                setResidents(residentsResponse.residents || []);
                setHouseholds(householdsResponse.houseHolds || []);
                setAlert({
                    type: 'success',
                    message: `Đã xóa cư dân ${residentToDelete.Name} và cập nhật thông tin liên quan!` +
                        (relatedHouseholds.length > 0 ? ' Các hộ gia đình liên quan đã được cập nhật.' : '')
                });
            } catch (err) {
                console.error('Error deleting resident:', err);
                setAlert({
                    type: 'error',
                    message: 'Xóa cư dân thất bại. Vui lòng thử lại.'
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
                <h1 className="text-2xl font-bold text-gray-800">Resident List</h1>
                <button
                    onClick={() => navigate(`${dashboardPrefix}/residents/create`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add New Resident
                </button>
            </div>

            {residents.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No residents found.</p>
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
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date of Birth
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Address
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Occupation
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {residents.map((resident, index) => (
                                <tr key={resident._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.Name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.CID}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(resident.DateOfBirth).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.Gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.HouseHoldID?.map(id => {
                                            const household = households.find(h => h._id === id);
                                            return household ? household.Address : 'N/A';
                                        }).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.Occupation}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.Status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {resident.PhoneNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEdit(resident._id)}
                                                className="text-yellow-600 hover:text-yellow-900"
                                                title="Edit"
                                            >
                                                <FaEdit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(resident._id)}
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

export default ResidentList;


