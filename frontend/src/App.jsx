import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Header from './components/home/Header';
import { useAuth } from './contexts/AuthContext';
import PrivateRoutes from './routes/PrivateRoutes';
import RoleBaseRoutes from './routes/RoleBaseRoutes';
import AdminDashboard from './pages/AdminDashboard';
import AdminSummary from './components/admin/AdminSummary';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
// Placeholder pages
const NotFoundPage = () => <div className="p-4 text-center"><h2 className="text-2xl font-bold">404 - Page Not Found</h2><p>The page you are looking for does not exist.</p></div>;

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

function App() {
  const { loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-2xl font-semibold text-blue-600 mb-2">Loading Application</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="fixed top-0 left-0 w-full z-30">
        <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage onClose={() => window.history.back()} />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <RegisterPage onClose={() => window.history.back()} />
              </PublicRoute>
            } />
            <Route path="/forgot-password" element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={
              <PrivateRoutes>
                <RoleBaseRoutes allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }>
              <Route index element={<AdminSummary />} />
            </Route>
            <Route path="*" element={<NotFoundPage onClose = {() => window.history.back()} />} />
          </Routes>
      </main>
      <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
        <p>&copy; {new Date().getFullYear()} Management App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App; 