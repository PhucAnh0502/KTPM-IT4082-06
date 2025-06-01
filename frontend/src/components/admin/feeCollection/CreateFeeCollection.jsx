import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaUserEdit, FaTrash, FaEye } from 'react-icons/fa';
import { createFeeCollection } from '../../../services/feeCollectionService';
import { getAllFees } from '../../../services/feeService';

const CreateFeeCollection = () => {
    const [feeCollection, setFeeCollection] = useState({
        Fees: [],
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
            Fees: selectedOptions // Store as array of selected fees
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Format dates to match the required format
        const formattedData = {
            ...feeCollection,
            Fees: feeCollection.Fees, // giữ nguyên là mảng các string
            CreateDate: feeCollection.CreateDate.replace('T', ' '),
            DueDate: feeCollection.DueDate.replace('T', ' ')
        };

        try {
            await createFeeCollection(formattedData);
            setAlert({ type: 'success', message: 'Tạo đợt thu phí thành công!' });
            setTimeout(() => {
                navigate('/admin-dashboard/fee-collections');
            }, 1500);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response?.data?.error || 'Tạo đợt thu phí thất bại!'
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

            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Tạo đợt thu phí mới</h2>
                    <button
                        onClick={() => navigate('/admin-dashboard/fee-collections')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        ← Quay lại
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Fees">
                            Danh sách phí
                        </label>
                        <select
                            id="Fees"
                            name="Fees"
                            multiple
                            value={feeCollection.Fees}
                            onChange={handleFeeSelection}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            size="5"
                        >
                            {fees.map((fee) => (
                                <option key={fee._id} value={fee.feeName}>
                                    {fee.feeName} - {fee.FeeType}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Giữ Ctrl (Windows) hoặc Command (Mac) để chọn nhiều phí
                        </p>
                        {feeCollection.Fees.length > 0 && (
                            <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700">Phí đã chọn:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {feeCollection.Fees.map((fee, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                        >
                                            {fee}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CreateDate">
                            Ngày bắt đầu
                        </label>
                        <input
                            type="datetime-local"
                            id="CreateDate"
                            name="CreateDate"
                            value={feeCollection.CreateDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DueDate">
                            Ngày đến hạn
                        </label>
                        <input
                            type="datetime-local"
                            id="DueDate"
                            name="DueDate"
                            value={feeCollection.DueDate}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? (
                                'Đang xử lý...'
                            ) : (
                                <>
                                    <FaUserPlus className="mr-2" />
                                    Tạo đợt thu phí
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFeeCollection;