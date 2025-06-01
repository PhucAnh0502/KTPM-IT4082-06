import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout, userRole } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to={isAuthenticated ? `/${userRole}-dashboard` : "/"} className="text-xl font-bold hover:text-blue-200 mb-2 md:mb-0">
          Management App
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header; 