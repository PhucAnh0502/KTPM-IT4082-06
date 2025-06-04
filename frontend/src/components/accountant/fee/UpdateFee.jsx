import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllFees, updateFee } from '../../../services/feeService';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const FEE_TYPES = [
    { value: 'vehicle_fee', label: 'Phí xe' },
    { value: 'service', label: 'Phí dịch vụ' },
    { value: 'management', label: 'Phí quản lý' }
];

const AccountantUpdateFee = () => {
    const { id } = useParams();
    const [fee, setFee] = useState(null);
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchFee = async () => {
            try {
                const response = await getAllFees();
                if (response?.fees && Array.isArray(response.fees)) {
                    const found = response.fees.find(f => f._id === id);
                    if (found) {
                        setFee(found);
                    } else {
                        setAlert({ type: 'error', message: 'Không tìm thấy phí' });
                    }
                }
                setLoading(false);
            } catch (err) {
                setAlert({ type: 'error', message: 'Lỗi khi tải dữ liệu' });
                setLoading(false);
            }
        };
        fetchFee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Lấy thông tin phí cũ để so sánh
        const oldFee = await getAllFees().then(res => 
            res.fees.find(f => f._id === id)
        );

        // Chỉ lấy đúng 4 trường cần thiết
        const { FeeType, Description, feeName, FeeCollectionID } = fee;
        const payload = { FeeType, Description, feeName, FeeCollectionID };

        try {
            // Nếu tên phí thay đổi, cần cập nhật trong các đợt thu phí
            if (oldFee && oldFee.feeName !== feeName) {
                const relatedCollections = collections.filter(col => 
                    col.Fees && col.Fees.includes(oldFee.feeName)
                );

                if (relatedCollections.length > 0) {
                    if (!window.confirm(
                        `Phí này đang được sử dụng trong ${relatedCollections.length} đợt thu phí. ` +
                        `Việc thay đổi tên phí sẽ ảnh hưởng đến các đợt thu phí này. Bạn có muốn tiếp tục?`
                    )) {
                        setLoading(false);
                        return;
                    }

                    // Cập nhật tên phí trong các đợt thu phí liên quan
                    for (const collection of relatedCollections) {
                        const updatedFees = collection.Fees.map(f => 
                            f === oldFee.feeName ? feeName : f
                        );
                        await updateFeeCollection(collection._id, {
                            ...collection,
                            Fees: updatedFees
                        });
                    }
                }
            }

            await updateFee(id, payload);
            setAlert({ type: 'success', message: 'Cập nhật phí thành công!' });
            setTimeout(() => {
                navigate('/accountant-dashboard/reports');
            }, 1500);
        } catch (err) {
            setAlert({ type: 'error', message: err.response?.data?.error || 'Cập nhật thất bại!' });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (!fee) return <div className="p-4 text-red-500">Không tìm thấy phí</div>;

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
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Cập nhật phí</h2>
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
                            value={fee.FeeType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Chọn loại phí</option>
                            {FEE_TYPES.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
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
                            value={fee.feeName}
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
                            value={fee.Description}
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
                            value={fee.FeeCollectionID}
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
                                    Lưu thay đổi
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountantUpdateFee;
