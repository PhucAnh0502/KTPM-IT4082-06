import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService'; // Import registerUser

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('resident');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await registerUser({ Email: email, Password: password, Role: role });
      setSuccessMessage(response.message || 'Registration successful! You can now log in.');
      // Clear form fields after successful registration
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('resident');
      // Navigate to login page after a short delay to show the success message
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 seconds delay
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Failed to register. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register New Account</h2>
        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm text-center">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-sm text-center">
            {successMessage}
          </p>
        )}
        {!successMessage && ( // Only show form if no success message
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email-register" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email-register"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password-register" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="password-register"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Create a password"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword-register" className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword-register"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="role-register" className="block text-sm font-medium text-gray-600 mb-1">Role</label>
              <select 
                id="role-register"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="resident">Resident</option>
                <option value="leader">Leader</option>
                <option value="accountant">Accountant</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading || successMessage} // Disable button also on success to prevent re-submission
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-pulse">Registering...</span>
                ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}
        <p className="mt-6 text-center text-sm text-gray-600">
          {successMessage ? 'Redirecting to login...' : 'Already have an account?'} <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage; 