import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/home/Header';
import { useAuth } from './contexts/AuthContext';
import PrivateRoutes from './routes/PrivateRoutes';
import RoleBaseRoutes from './routes/RoleBaseRoutes';
import PublicRoute from './routes/PublicRoutes';
import AdminDashboard from './pages/AdminDashboard';
import AdminSummary from './components/admin/AdminSummary';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserList from './components/admin/user/UserList';
import FeeLists from './components/admin/fee/FeeLists';
import CreateFee from './components/admin/fee/CreateFee';
import ViewDetailsFee from './components/admin/fee/ViewDetailsFee';
import FeeCollectionList from './components/admin/feeCollection/FeeCollectionList';
import CreateFeeCollection from './components/admin/feeCollection/CreateFeeCollection';
import UpdateFeeCollection from './components/admin/feeCollection/UpdateFeeCollection';
import UpdateFee from './components/admin/fee/UpdateFee';
import HouseholdList from './components/admin/household/HouseholdList';
import CreateHousehold from './components/admin/household/CreateHousehold';
import UpdateHouseHold from './components/admin/household/UpdateHouseHold';
import ResidentList from './components/admin/resident/ResidentList'; 
import CreateResident from './components/admin/resident/CreateResident';
import UpdateResident from './components/admin/resident/UpdateResident';
import VehicleList from './components/admin/vehicle/VehicleList';
import UpdateVehicle from './components/admin/vehicle/UpdateVehicle';
import CreateVehicle from './components/admin/vehicle/CreateVehicle';
import CreateUser from './components/admin/user/CreateUser';
import UpdateUser from './components/admin/user/UpdateUser';
import PaymentList from './components/admin/payments/PaymentList';
import AccountantDashboard from './pages/accountant/AccountantDashboard';
import AccountantSummary from './components/accountant/AccountantSumary';
import LeaderDashboard from './components/leader/LeaderDashboard';
import AccountantProfile from './pages/accountant/AccountantProfile';
import AccountantPayments from './pages/accountant/AccountantPayments';
import AccountantFinancialReport from './pages/accountant/AccountantFinancialReport';
import AccountantCreateFee from './components/accountant/fee/CreateFee';
import AccountantUpdateFee from './components/accountant/fee/UpdateFee';
import AccountantFeeLists from './components/accountant/fee/FeeLists';
import AccountantViewDetailsFee from './components/accountant/fee/ViewDetailsFee';
import AccountantCreateFeeCollection from './components/accountant/feeCollection/CreateFeeCollection';
import AccountantUpdateFeeCollection from './components/accountant/feeCollection/UpdateFeeCollection';
import AccountantFeeCollectionList from './components/accountant/feeCollection/FeeCollectionList';
import AccountantPaymentList from './components/accountant/payments/PaymentList';
import LeaderSummary from './components/leader/LeaderSummary';
import LeaderFeeList from './components/leader/Fee&FeeCollectionList/LeaderFeeLists';
import LeaderFeeCollectionList from './components/leader/Fee&FeeCollectionList/LeaderFeeCollectionList';
// Placeholder pages
const NotFoundPage = () => <div className="p-4 text-center"><h2 className="text-2xl font-bold">404 - Page Not Found</h2><p>The page you are looking for does not exist.</p></div>;


// Helper function to get dashboard path
const getDashboardPath = (role) => {
  console.log('getDashboardPath called with role:', role); 

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
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="flex-1 pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <HomePage />
              <footer className="bg-gray-800 text-white text-center p-4 mt-auto">
                <p>&copy; {new Date().getFullYear()} Management App. All rights reserved.</p>
              </footer>
            </>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage onClose={() => window.history.back()} />
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
                <div className="min-h-[calc(100vh-4rem)]">
                  <AdminDashboard />
                </div>
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />} />
            <Route path = "/admin-dashboard/users" element = {<UserList />} />
            <Route path = "/admin-dashboard/users/create" element = {<CreateUser />} />
            <Route path = "/admin-dashboard/users/edit/:id" element = {<UpdateUser />} />
            <Route path = "/admin-dashboard/fees" element = {<FeeLists />} />
            <Route path = "/admin-dashboard/fees/create" element = {<CreateFee />} />
            <Route path = "/admin-dashboard/fees/edit/:id" element = {<UpdateFee />} />
            <Route path = "/admin-dashboard/fees/:id" element = {<ViewDetailsFee />} />
            <Route path = "/admin-dashboard/fee-collections" element = {<FeeCollectionList />} />
            <Route path = "/admin-dashboard/fee-collections/create" element = {<CreateFeeCollection />} />
            <Route path = "/admin-dashboard/fee-collections/edit/:id" element = {<UpdateFeeCollection />} />
            <Route path = "/admin-dashboard/households" element = {<HouseholdList />} />
            <Route path = "/admin-dashboard/households/create" element = {<CreateHousehold />} />
            <Route path = "/admin-dashboard/households/edit/:id" element = {<UpdateHouseHold />} />
            <Route path = "/admin-dashboard/residents" element = {<ResidentList />} />
            <Route path = "/admin-dashboard/residents/create" element = {<CreateResident />} />
            <Route path = "/admin-dashboard/residents/edit/:id" element = {<UpdateResident />} />
            <Route path = "/admin-dashboard/vehicles" element = {<VehicleList />} />
            <Route path = "/admin-dashboard/vehicles/edit/:id" element = {<UpdateVehicle />} />
            <Route path = "/admin-dashboard/vehicles/create" element = {<CreateVehicle />} />
            <Route path = "/admin-dashboard/payments" element = {<PaymentList />} />
            {/* Add other admin sub-routes here */}
          </Route>

          {/* Accountant Routes */}
          <Route path="/accountant-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes allowedRoles={['accountant']}>
                <AccountantDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<AccountantSummary />} />
            <Route path="profile" element={<AccountantProfile />} />
            <Route path="payments" element={<AccountantPayments />} />
            <Route path="reports" element={<AccountantFinancialReport />} />
            <Route path = "reports" index element = {<AccountantFeeLists />} />
            <Route path = "reports/fees/create"  element = {<AccountantCreateFee />} />
            <Route path = "reports/fees/edit/:id" element = {<AccountantUpdateFee />} />
            <Route path = "reports/fees/:id" element = {<AccountantViewDetailsFee />} />
            <Route path = "fee-collections" element = {<AccountantFeeCollectionList />} />
            <Route path = "fee-collections/create" element = {<AccountantCreateFeeCollection />} />
            <Route path = "fee-collections/edit/:id" element = {<AccountantUpdateFeeCollection />} />
            <Route path = "payments" index element = {<AccountantPaymentList />} />
          </Route>

          {/* Leader Routes */}
          <Route path="/leader-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes allowedRoles={['leader']}>
                <LeaderDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }>
            <Route index element={<LeaderSummary />} />
            <Route path = "/leader-dashboard/fees" element = {<LeaderFeeList />} />
            <Route path = "/leader-dashboard/fee-collections" element = {<LeaderFeeCollectionList />} />
            <Route path = "/leader-dashboard/households" element = {<HouseholdList />} />
            <Route path = "/leader-dashboard/households/create" element = {<CreateHousehold />} />
            <Route path = "/leader-dashboard/households/edit/:id" element = {<UpdateHouseHold />} />
            <Route path = "/leader-dashboard/residents" element = {<ResidentList />} />
            <Route path = "/leader-dashboard/residents/create" element = {<CreateResident />} />
            <Route path = "/leader-dashboard/residents/edit/:id" element = {<UpdateResident />} />
            <Route path = "/leader-dashboard/vehicles" element = {<VehicleList />} />
            <Route path = "/leader-dashboard/vehicles/edit/:id" element = {<UpdateVehicle />} />
            <Route path = "/leader-dashboard/vehicles/create" element = {<CreateVehicle />} />
          </Route>

          <Route path="*" element={<NotFoundPage onClose = {() => window.history.back()} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;