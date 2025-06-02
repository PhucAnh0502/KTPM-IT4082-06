import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { createFee, updateFee } from '../../services/feeService';

// Define feeTypes
const feeTypes = ['monthly', 'quarterly', 'yearly'];

// Define Zod schema for form validation
const feeSchema = z.object({
    feeType: z.string().nonempty('Loại phí là bắt buộc'),
    feeName: z.string().nonempty('Tên phí là bắt buộc'),
    description: z.string().optional(),
    feeCollectionID: z.string().nonempty('Mã thu phí là bắt buộc'),
    amount: z.number().positive('Số tiền phải lớn hơn 0'),
});

const FeeForm = ({ defaultValues, onSuccess, isEdit = false, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(feeSchema),
        defaultValues: {
            feeType: defaultValues?.feeType || '',
            feeName: defaultValues?.feeName || '',
            description: defaultValues?.description || '',
            feeCollectionID: defaultValues?.feeCollectionID || '',
            amount: defaultValues?.amount || 0,
        },
    });

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await updateFee(defaultValues.id, data);
                toast.success('Cập nhật phí thành công!');
            } else {
                await createFee(data);
                toast.success('Tạo phí mới thành công!');
            }
            reset();
            onSuccess();
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    const handleCancel = () => {
        reset(); // Reset the form fields
        if (typeof onClose === 'function') {
            onClose(); // Call onClose only if it's a function
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Loại phí</label>
                <select
                    {...register('feeType')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="">Chọn loại phí</option>
                    {feeTypes.map(type => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
                {errors.feeType && <p className="mt-1 text-sm text-red-600">{errors.feeType.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Tên phí</label>
                <input
                    type="text"
                    {...register('feeName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.feeName && <p className="mt-1 text-sm text-red-600">{errors.feeName.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                    {...register('description')}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Mã thu phí</label>
                <input
                    type="text"
                    {...register('feeCollectionID')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.feeCollectionID && <p className="mt-1 text-sm text-red-600">{errors.feeCollectionID.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Số tiền</label>
                <input
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isEdit ? 'Cập nhật phí' : 'Tạo phí'}
                </button>
            </div>
        </form>
    );
};

export default FeeForm;