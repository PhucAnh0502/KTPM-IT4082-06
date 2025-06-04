import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import FeeForm from './FeeForm';
import Modal from './Modal';
import { 
  getAllFees, 
  deleteFee,
  updateFee,
  createFee
} from '../../services/feeService';

const FeesList = () => {
    const [fees, setFees] = useState([]);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFee, setCurrentFee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllFees();
            setFees(data);
        } catch (error) {
            setError(error.message);
            toast.error(`Lỗi khi tải danh sách phí: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (feeId) => {
        if (!window.confirm('Bạn chắc chắn muốn xóa phí này?')) return;
        
        try {
            await deleteFee(feeId);
            toast.success('Xóa phí thành công!');
            await fetchFees();
        } catch (error) {
            toast.error(`Lỗi khi xóa phí: ${error.message}`);
        }
    };

    const handleFormSubmitSuccess = async () => {
        setIsModalOpen(false);
        await fetchFees();
    };

    const filteredFees = fees.filter(fee => 
        fee.feeName?.toLowerCase().includes(filter.toLowerCase()) || 
        fee.feeCollectionID?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý phí</h2>
                <button
                    onClick={() => {
                        setCurrentFee(null);
                        setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Tạo phí mới
                </button>
            </div>
            
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc mã phí"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên phí</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại phí</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã thu</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số tiền</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8">
                                        <div className="flex justify-center items-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                                            <span>Đang tải dữ liệu...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-red-500">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredFees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        Không tìm thấy phí nào
                                    </td>
                                </tr>
                            ) : (
                                filteredFees.map((fee) => (
                                    <tr key={fee.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.feeName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{fee.feeType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.feeCollectionID}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">đ{fee.amount?.toLocaleString('vi-VN')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                            <button
                                                onClick={() => {
                                                    setCurrentFee(fee);
                                                    setIsModalOpen(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(fee.id)}
                                                className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">
                        {currentFee ? 'Chỉnh sửa phí' : 'Tạo phí mới'}
                    </h2>
                    <FeeForm 
                        defaultValues={currentFee || {}} 
                        isEdit={!!currentFee}
                        onSuccess={handleFormSubmitSuccess} 
                    />
                </div>
            </Modal>
        </div>
    );
};

export default FeesList;