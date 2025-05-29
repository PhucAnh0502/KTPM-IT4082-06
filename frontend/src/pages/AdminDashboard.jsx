import React from 'react';
import Header from '../components/home/Header';
import AdminSidebar from '../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';
const AdminDashboard = () => {
    return (
      <div className='flex min-h-screen'>
          <AdminSidebar />
          <div className='flex-1 ml-64 bg-gray-100 min-h-full w-full'>
              <Outlet />
          </div>
      </div>
    )
  }
  
  export default AdminDashboard;
