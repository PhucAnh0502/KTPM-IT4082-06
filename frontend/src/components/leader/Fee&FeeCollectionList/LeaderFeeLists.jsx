import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { getAllFees } from '../../../services/feeService';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const FeeLists = () => {
    const [fees, setFees] = useState([]);
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
        const fetchData = async () => {
            try {
                const [feesRes, collectionsRes] = await Promise.all([
                    getAllFees(),
                    getAllFeeCollections()
                ]);
                
                if (feesRes?.fees && Array.isArray(feesRes.fees)) {
                    setFees(feesRes.fees);
                }
                
                if (collectionsRes?.feeCollections && Array.isArray(collectionsRes.feeCollections)) {
                    setCollections(collectionsRes.feeCollections);
                }
                
                setLoading(false);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch data');
                setLoading(false);
            }
        };
        fetchData();
    }, []);

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
                <h1 className="text-2xl font-bold">Fee List</h1>
                {/* Remove create button for leader */}
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {fees.map((fee) => (
                            <tr key={fee._id}>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.FeeType}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.feeName}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{fee.Description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {fee.FeeCollectionID ? (
                                        collections.find(col => col._id === fee.FeeCollectionID)?.Name || 'N/A'
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => navigate(`/leader-dashboard/fees/${fee._id}`)}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>
                                    {/* Remove Edit and Delete buttons for leader */}
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
