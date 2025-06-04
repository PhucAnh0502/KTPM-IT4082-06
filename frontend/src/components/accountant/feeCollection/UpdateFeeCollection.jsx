import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllFeeCollections, updateFeeCollection } from '../../../services/feeCollectionService';
import { getAllFees } from '../../../services/feeService';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateFeeCollection = () => {
    const { id } = useParams();
    const [feeCollection, setFeeCollection] = useState({
        Fees: [],
        Name: '',
        CreateDate: '',
        DueDate: '',
    });
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
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
                setAlert({ type: 'error', message: 'Lỗi khi tải danh sách phí' });
            }
        };
        fetchFees();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Fetch fee collection data
    useEffect(() => {
        const fetchFeeCollection = async () => {
            try {
                const response = await getAllFeeCollections();
                if (response?.feeCollections && Array.isArray(response.feeCollections)) {
                    const found = response.feeCollections.find(fc => fc._id === id);
                    if (found) {
                        // Convert fee names to IDs for the select element
                        const feeIds = found.Fees.map(feeName => {
                            const fee = fees.find(f => f.feeName === feeName);
                            return fee ? fee._id : null;
                        }).filter(Boolean);

                        setFeeCollection({
                            ...found,
                            Fees: feeIds,
                            CreateDate: found.CreateDate ? formatDate(found.CreateDate) : '',
                            DueDate: found.DueDate ? formatDate(found.DueDate) : ''
                        });
                    } else {
                        setAlert({ type: 'error', message: 'Không tìm thấy đợt thu phí' });
                    }
                }
                setLoading(false);
            } catch (error) {
                setAlert({ type: 'error', message: 'Lỗi khi tải dữ liệu' });
                setLoading(false);
            }
        };
        fetchFeeCollection();
    }, [id, fees]);

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
            Fees: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Convert fee IDs back to names for the API
            const feeNames = feeCollection.Fees.map(feeId => {
                const fee = fees.find(f => f._id === feeId);
                return fee ? fee.feeName : null;
            }).filter(Boolean);

            // Format dates
            const formattedData = {
                Fees: feeNames,
                CreateDate: formatDate(feeCollection.CreateDate),
                DueDate: formatDate(feeCollection.DueDate)
            };

            await updateFeeCollection(id, formattedData);
            setAlert({ type: 'success', message: 'Fee collection updated successfully!' });
            navigate('/accountant-dashboard/reports/fee-collections');
        } catch (error) {
            setAlert({ 
                type: 'error', 
                message: error.response?.data?.error || 'Failed to update fee collection!' 
            });
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-4">
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
                <h2 className="text-2xl font-bold">Update Fee Collection</h2>
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
                        Update Fee Collection
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateFeeCollection;


