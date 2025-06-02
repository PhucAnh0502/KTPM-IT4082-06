import { useAuth } from '../contexts/AuthContext';
import { useLocation, Navigate } from 'react-router-dom';
import React from 'react';
import getDashboardPath from '../utils/DashboardPath';
// Public Route Component
const PublicRoute = ({ children }) => {
    const { isAuthenticated, userRole } = useAuth();
    const location = useLocation();
  
    if (isAuthenticated) {
      const dashboardPath = getDashboardPath(userRole);
      return <Navigate to={dashboardPath} state={{ from: location }} replace />;
    }
  
    return children;
  };

export default PublicRoute;