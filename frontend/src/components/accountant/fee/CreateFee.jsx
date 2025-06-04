import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { createFee } from '../../../services/feeService';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const FEE_TYPES = {
    VEHICLE_FEE: 'vehicle_fee',
    SERVICE: 'service',
    MANAGEMENT: 'management'
};

const AccountantCreateFee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        FeeType: '',
        Description: '',
        feeName: '',
        FeeCollectionID: ''
    });
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });

    // Fetch collections
    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const res = await getAllFeeCollections();
                if (res?.feeCollections && Array.isArray(res.feeCollections)) {
                    setCollections(res.feeCollections);
                }
            } catch {}
        };
        fetchCollections();
    }, []);

    // Auto-hide alert after 3 seconds
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ type: '', message: '' }), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createFee(formData);
            setAlert({ type: 'success', message: 'Tạo phí mới thành công!' });
            setTimeout(() => {
                navigate('/accountant-dashboard/reports');
            }, 1500);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response?.data?.error || 'Tạo phí mới thất bại!'
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
                    <h2 className="text-2xl font-bold">Tạo phí mới</h2>
                    <button
                        onClick={() => navigate('/accountant-dashboard/reports')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        ← Quay lại
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FeeType">
                            Loại phí
                        </label>
                        <select
                            id="FeeType"
                            name="FeeType"
                            value={formData.FeeType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Chọn loại phí</option>
                            <option value={FEE_TYPES.VEHICLE_FEE}>Phí xe</option>
                            <option value={FEE_TYPES.SERVICE}>Phí dịch vụ</option>
                            <option value={FEE_TYPES.MANAGEMENT}>Phí quản lý</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feeName">
                            Tên phí
                        </label>
                        <input
                            type="text"
                            id="feeName"
                            name="feeName"
                            value={formData.feeName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Description">
                            Mô tả
                        </label>
                        <textarea
                            id="Description"
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="FeeCollectionID">
                            Đợt thu phí
                        </label>
                        <select
                            id="FeeCollectionID"
                            name="FeeCollectionID"
                            value={formData.FeeCollectionID}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Chọn đợt thu phí</option>
                            {collections.map(col => (
                                <option key={col._id} value={col._id}>
                                    {col.Name}
                                </option>
                            ))}
                        </select>
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
                                    Tạo phí mới
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountantCreateFee;



