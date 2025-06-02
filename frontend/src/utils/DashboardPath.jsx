import React from 'react';

// Helper function to get dashboard path
const getDashboardPath = (role) => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'leader':
        return '/leader-dashboard';
      case 'resident':
        return '/resident-dashboard';
      case 'accountant':
        return '/accountant-dashboard';
      default:
        return '/';
    }
  };

export default getDashboardPath;