import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, register as authRegister } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const navigate = useNavigate();
  const parseToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseToken(token);
      if (payload) {
        setUserRole(payload.role);
        setIsAuthenticated(true);
        console.log('User role:', payload.role);
      } else {
        handleLogout();
      }
    }
    setLoadingAuth(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authLogin({ Email: email, Password: password });
      const { token } = response;
      localStorage.setItem('token', token);
      
      const payload = parseToken(token);
      
      if (payload) {
        // Store role from token payload
        const role = payload.role;
        localStorage.setItem('accountRole', role);
        setUserRole(role);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (email, password, role) => {
    try {
      await authRegister({
        Email: email,
        Password: password,
        Role: role,
      });
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const handleLogout = () => {
    // Clear all authentication related items from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('accountRole');
    // Clear any other potential auth-related items
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
    
    // Reset all auth states
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Back to home page
    navigate('/');
  };

  const value = {
    isAuthenticated,
    userRole,
    loadingAuth,
    login,
    register,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 