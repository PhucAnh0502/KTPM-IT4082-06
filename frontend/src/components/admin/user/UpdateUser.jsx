import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { getAllAccounts, updateAccount } from '../../../services/accountService';

const UpdateUser = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Email: '',
        Role: '',
        Password: '',
        ConfirmPassword: ''
    });
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

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getAllAccounts();
                if (response?.accounts && Array.isArray(response.accounts)) {
                    const found = response.accounts.find(user => user._id === id);
                    if (found) {
                        setFormData({
                            Email: found.Email,
                            Role: found.Role,
                            Password: '',
                            ConfirmPassword: ''
                        });
                    } else {
                        setAlert({ type: 'error', message: 'Account not found' });
                    }
                }
                setLoading(false);
            } catch (error) {
                setAlert({ type: 'error', message: 'Error loading data' });
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

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

        // Nếu không nhập mật khẩu mới thì không gửi mật khẩu lên
        if (!formData.Password) {
            const { Password, ConfirmPassword, ...dataToSubmit } = formData;
            try {
                await updateAccount(id, dataToSubmit);
                setAlert({ type: 'success', message: 'Update account successfully!' });
                setTimeout(() => {
                    navigate('/admin-dashboard/users');
                }, 1500);
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: error.response?.data?.message || 'Update account failed!'
                });
            }
        } else {
            // Nếu có nhập mật khẩu mới thì kiểm tra xác nhận
            if (formData.Password !== formData.ConfirmPassword) {
                setAlert({
                    type: 'error',
                    message: 'Confirm password does not match!'
                });
                setLoading(false);
                return;
            }

            try {
                const { ConfirmPassword, ...dataToSubmit } = formData;
                await updateUser(id, dataToSubmit);
                setAlert({ type: 'success', message: 'Update account successfully!' });
                setTimeout(() => {
                    navigate('/admin-dashboard/users');
                }, 1500);
            } catch (error) {
                setAlert({
                    type: 'error',
                    message: error.response?.data?.message || 'Update account failed!'    
                });
            }
        }
        setLoading(false);
    };

    if (loading) return <div className="p-4">Loading...</div>;

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
                    <h2 className="text-2xl font-bold">Update Account</h2>
                    <button
                        onClick={() => navigate('/admin-dashboard/users')}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        ← Back
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
                            New Password (leave empty if you don't want to change)
                        </label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ConfirmPassword">
                            Confirm new password
                        </label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            value={formData.ConfirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Role">
                            Role
                        </label>
                        <select
                            id="Role"
                            name="Role"
                            value={formData.Role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="leader">Leader</option>
                            <option value="accountant">Accountant</option>
                            <option value="admin">Admin</option>
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
                                'Processing...'
                            ) : (
                                <>
                                    <FaUserEdit className="mr-2" />
                                    Save changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser; 