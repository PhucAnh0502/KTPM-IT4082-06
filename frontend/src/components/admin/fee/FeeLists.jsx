import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye } from 'react-icons/fa';
import { getAllFees, deleteFee } from '../../../services/feeService';

const FeeLists = () => {
    const [fees, setFees] = useState([]);
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
        const fetchFees = async () => {
            try {
                const response = await getAllFees();
                if (response?.fees && Array.isArray(response.fees)) {
                    setFees(response.fees);
                } else {
                    
                }
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch fees');
                setLoading(false);
            }
        };
        fetchFees();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteFee(id);
            setFees(fees.filter((fee) => fee._id !== id));
            setAlert({ type: 'success', message: 'Xóa phí thành công!' });
        } catch (error) {
            setAlert({ type: 'error', message: error.response?.data?.error || 'Xóa phí thất bại!' });
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
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

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Fee Management</h1>
                <button
                    onClick={() => navigate('/admin-dashboard/fees/create')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                >
                    <FaUserPlus className="mr-2" /> Add New Fee
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {fees.map((fee) => (
                            <tr key={fee._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.FeeType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.feeName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.Description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.FeeCollectionID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/fees/${fee._id}`)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/fees/edit/${fee._id}`)}
                                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                                    >
                                        <FaUserEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fee._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FaTrash />
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

export default FeeLists;
