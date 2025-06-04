import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye, FaArrowLeft } from 'react-icons/fa';
import { createFeeCollection } from '../../../services/feeCollectionService';
import { getAllFees } from '../../../services/feeService';

const CreateFeeCollection = () => {
    const [feeCollection, setFeeCollection] = useState({
        Fees: [],
        Name: '',
        CreateDate: '',
        DueDate: '',
    });
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(false);
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

    // Fetch available fees
    useEffect(() => {
        const fetchFees = async () => {
            try {
                const response = await getAllFees();
                if (response?.fees && Array.isArray(response.fees)) {
                    setFees(response.fees);
                }
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch fees');
            }
        };
        fetchFees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeCollection(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeeSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFeeCollection(prev => ({
            ...prev,
            Fees: selectedOptions // Store as array of selected fee IDs
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Format dates
            const formattedData = {
                Name: feeCollection.Name.trim(),
                Fees: Array.isArray(feeCollection.Fees) ? feeCollection.Fees.flat().filter(Boolean) : [],
                CreateDate: formatDate(feeCollection.CreateDate),
                DueDate: formatDate(feeCollection.DueDate)
            };

            await createFeeCollection(formattedData);
            setAlert({ type: 'success', message: 'Fee collection created successfully!' });
            navigate('/accountant-dashboard/reports/fee-collections');
        } catch (error) {
            setAlert({ 
                type: 'error', 
                message: error.response?.data?.error || 'Failed to create fee collection. Please check your input and try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

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
                <h2 className="text-2xl font-bold">Create New Fee Collection</h2>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center"
                    onClick={() => navigate('/accountant-dashboard/reports/fee-collections')}
                >
                    <FaArrowLeft className="inline-block mr-2" /> Back to List
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Collection Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="Name"
                        value={feeCollection.Name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fees">
                        Select Fees
                    </label>
                    <select
                        id="fees"
                        name="Fees"
                        value={feeCollection.Fees}
                        onChange={handleFeeSelection}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        multiple
                    >
                        {fees.map((fee) => (
                            <option key={fee._id} value={fee._id}>
                                {fee.feeName}
                            </option>
                        ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Windows) or Command (Mac) to select multiple fees</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="createDate">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="createDate"
                        name="CreateDate"
                        value={feeCollection.CreateDate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                        Due Date
                    </label>
                    <input
                        type="date"
                        id="dueDate"
                        name="DueDate"
                        value={feeCollection.DueDate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Create Fee Collection
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateFeeCollection;