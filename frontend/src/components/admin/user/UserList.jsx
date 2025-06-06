import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { getAllAccounts, deleteAccount } from '../../../services/accountService';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [roleFilter, setRoleFilter] = useState('all');
    const [createdDateFilter, setCreatedDateFilter] = useState('');
    const [lastUpdateFilter, setLastUpdateFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllAccounts();
                if (response?.accounts && Array.isArray(response.accounts)) {
                    setUsers(response.accounts);
                } else {
                    setUsers([]);
                }
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch users');
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ type: '', message: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleDelete = async (id) => {
        try {
            await deleteAccount(id);
            setUsers(users.filter((user) => user._id !== id));
            setAlert({ type: 'success', message: 'Xóa người dùng thành công!' });
        } catch (error) {
            setAlert({ type: 'error', message: error.response?.data?.error || 'Xóa người dùng thất bại!' });
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter users based on search term and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.Email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.Role === roleFilter;
        const matchesCreatedDate = !createdDateFilter || new Date(user.createdAt).toDateString() === new Date(createdDateFilter).toDateString();
        const matchesLastUpdate = !lastUpdateFilter || new Date(user.updatedAt).toDateString() === new Date(lastUpdateFilter).toDateString();
        
        return matchesSearch && matchesRole && matchesCreatedDate && matchesLastUpdate;
    });

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="p-4">
            {/* Alert Notification */}
            {alert.message && (
                <div
                    className={`flex items-center justify-between p-4 mb-4 rounded border shadow-sm
                        ${alert.type === 'success' ? 'bg-green-100 border-green-400 text-green-800' : ''}
                        ${alert.type === 'error' ? 'bg-red-100 border-red-400 text-red-800' : ''}
                    `}
                >
                    <span>
                        <b>
                            {alert.type === 'success' && '✔ Success:'}
                            {alert.type === 'error' && '✖ Error:'}
                        </b>{' '}
                        {alert.message}
                    </span>
                    <button onClick={() => setAlert({ type: '', message: '' })} className="font-bold text-xl leading-none">&times;</button>
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">User Management</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                    onClick={() => navigate('/admin-dashboard/users/create')}
                >
                    <FaUserPlus className="inline-block mr-2" /> Add User
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by Email..."
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="leader">Leader</option>
                                    <option value="accountant">Accountant</option>
                                    <option value="resident">Resident</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                                <input
                                    type="date"
                                    value={createdDateFilter}
                                    onChange={(e) => setCreatedDateFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Update</label>
                                <input
                                    type="date"
                                    value={lastUpdateFilter}
                                    onChange={(e) => setLastUpdateFilter(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No users found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left border-b">No.</th>
                                <th className="py-3 px-4 text-left border-b">Email</th>
                                <th className="py-3 px-4 text-left border-b">Role</th>
                                <th className="py-3 px-4 text-left border-b">Created At</th>
                                <th className="py-3 px-4 text-left border-b">Last Updated</th>
                                <th className="py-3 px-4 text-left border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="py-3 px-4 border-b">{user.Email}</td>
                                    <td className="py-3 px-4 border-b">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            user.Role === 'admin' ? 'bg-red-100 text-red-800' :
                                            user.Role === 'leader' ? 'bg-blue-100 text-blue-800' :
                                            user.Role === 'accountant' ? 'bg-green-100 text-green-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.Role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 border-b">{formatDate(user.createdAt)}</td>
                                    <td className="py-3 px-4 border-b">{formatDate(user.updatedAt)}</td>
                                    <td className="py-3 px-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/admin-dashboard/users/edit/${user._id}`)}
                                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                                                title="Update"
                                            >
                                                <FaUserEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                                                onClick={() => handleDelete(user._id)}
                                                title="Delete"
                                            >
                                                <FaTrash />
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

export default UserList;