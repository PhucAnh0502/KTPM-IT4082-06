import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import { getAllFees, deleteFee } from '../../../services/feeService';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const FeeLists = () => {
    const [fees, setFees] = useState([]);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedFeeType, setSelectedFeeType] = useState('');
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

    const handleDelete = async (id) => {
        const feeToDelete = fees.find(f => f._id === id);
        if (!feeToDelete) return;

        // Check if fee is being used in any fee collections
        const relatedCollections = collections.filter(col => 
            col.Fees && col.Fees.includes(feeToDelete.feeName)
        );

        if (relatedCollections.length > 0) {
            setAlert({ 
                type: 'error', 
                message: `Cannot delete this fee as it is being used in ${relatedCollections.length} fee collections. Please delete or update related fee collections first.` 
            });
            return;
        }

        if (window.confirm(`Are you sure you want to delete fee "${feeToDelete.feeName}"?`)) {
            try {
                await deleteFee(id);
                // Refresh both fee and fee collection lists
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
                
                setAlert({ type: 'success', message: 'Fee deleted successfully!' });
            } catch (error) {
                setAlert({ type: 'error', message: error.response?.data?.error || 'Failed to delete fee!' });
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Filter fees based on search term and filters
    const filteredFees = fees.filter(fee => {
        const matchesSearch = fee.feeName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCollection = !selectedCollection || fee.FeeCollectionID === selectedCollection;
        const matchesFeeType = !selectedFeeType || fee.FeeType === selectedFeeType;
        return matchesSearch && matchesCollection && matchesFeeType;
    });

    // Get unique fee types
    const uniqueFeeTypes = [...new Set(fees.map(fee => fee.FeeType))];

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

            {/* Search and Filter Section */}
            <div className="mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search by Fee Name..."
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Collection</label>
                                <select
                                    value={selectedCollection}
                                    onChange={(e) => setSelectedCollection(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Collections</option>
                                    {collections.map(collection => (
                                        <option key={collection._id} value={collection._id}>
                                            {collection.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                                <select
                                    value={selectedFeeType}
                                    onChange={(e) => setSelectedFeeType(e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Fee Types</option>
                                    {uniqueFeeTypes.map(type => (
                                        <option key={type} value={type}>
                                            {type}
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredFees.map((fee) => (
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
                                        onClick={() => navigate(`/admin-dashboard/fees/${fee._id}`)}
                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/admin-dashboard/fees/edit/${fee._id}`)}
                                        className="text-yellow-600 hover:text-yellow-900 mr-3"
                                        title="Edit"
                                    >
                                        <FaUserEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(fee._id)}
                                        className="text-red-600 hover:text-red-900"
                                        title="Delete"
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
