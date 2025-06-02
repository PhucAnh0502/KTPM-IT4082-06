import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { register } from '../../../services/authService';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Role: 'leader'
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: '', message: '' });
    const navigate = useNavigate();

    // Auto-hide alert after 3 seconds
    React.useEffect(() => {
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
            const response = await register(dataToSubmit);
            setAlert({
                type: 'success',
                message: response.message || 'Create account successfully!'
            });
            // Clear form
            setFormData({
                Email: '',
                Password: '',
                ConfirmPassword: '',
                Role: 'leader'
            });
            // Navigate back to user list after a short delay
            setTimeout(() => {
                navigate('/admin-dashboard/users');
            }, 1500);
        } catch (error) {
            setAlert({
                type: 'error',
                message: error.response?.data?.message || 'Create account failed!'
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
                    <h2 className="text-2xl font-bold">Create New Account</h2>
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
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="Password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Create password"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ConfirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="ConfirmPassword"
                            name="ConfirmPassword"
                            value={formData.ConfirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="Confirm password"
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
                                    <FaUserPlus className="mr-2" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
