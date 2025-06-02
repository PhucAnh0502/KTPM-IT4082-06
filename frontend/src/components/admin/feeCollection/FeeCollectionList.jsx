import React, { useState, useEffect } from 'react';
import { getAllFeeCollections, deleteFeeCollection } from '../../../services/feeCollectionService';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye } from 'react-icons/fa';

const FeeCollectionList = () => {
    const [collections, setCollections] = useState([]);
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
        const fetchCollections = async () => {
            try {
                const response = await getAllFeeCollections();
                if (response?.feeCollections && Array.isArray(response.feeCollections)) {
                    setCollections(response.feeCollections);
                } else {
                    setCollections([]);
                }
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch fee collections');
                setLoading(false);
            }
        };
        fetchCollections();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this fee collection? Related fees will be affected.')) {
            try {
                // Get collection info before deleting
                const collectionToDelete = collections.find(c => c._id === id);
                
                // Delete collection
                await deleteFeeCollection(id);
                
                // Update state
                setCollections(collections.filter((collection) => collection._id !== id));
                
                // Show success message
                setAlert({ 
                    type: 'success', 
                    message: `Fee collection "${collectionToDelete?.Name}" has been deleted and related fees have been updated!` 
                });
            } catch (error) {
                setAlert({ 
                    type: 'error', 
                    message: error.response?.data?.error || 'Failed to delete fee collection!' 
                });
            }
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
                <h2 className="text-2xl font-bold">Fee Collection Management</h2>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                    onClick={() => navigate('/admin-dashboard/fee-collections/create')}
                >
                    <FaUserPlus className="inline-block mr-2" /> Create New Fee Collection
                </button>
            </div>

            {collections.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No fee collections found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-3 px-4 text-left border-b">No.</th>
                                <th className="py-3 px-4 text-left border-b">Name</th>
                                <th className="py-3 px-4 text-left border-b">Fee List</th>
                                <th className="py-3 px-4 text-left border-b">Start Date</th>
                                <th className="py-3 px-4 text-left border-b">Due Date</th>
                                <th className="py-3 px-4 text-left border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collections.map((collection, index) => (
                                <tr key={collection._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{collection.Name}</div>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                        {collection.Fees && collection.Fees[0] ? (
                                            <div className="flex flex-wrap gap-1">
                                                {collection.Fees[0].map((fee, idx) => (
                                                    <span 
                                                        key={idx}
                                                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                                    >
                                                        {fee}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-gray-500">No fees</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 border-b">{formatDate(collection.CreateDate)}</td>
                                    <td className="py-3 px-4 border-b">{formatDate(collection.DueDate)}</td>
                                    <td className="py-3 px-4 border-b">
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                                                onClick={() => navigate(`/admin-dashboard/fee-collections/edit/${collection._id}`)}
                                                title="Edit"
                                            >
                                                <FaUserEdit />
                                            </button>
                                            <button
                                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                                                onClick={() => handleDelete(collection._id)}
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

export default FeeCollectionList;
