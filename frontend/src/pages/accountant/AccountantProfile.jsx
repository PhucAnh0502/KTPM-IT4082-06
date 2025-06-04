import React from 'react';
import Sidebar from '../../components/accountant/Sidebar';
import { Outlet } from 'react-router-dom';

const AccountantProfile = () => {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1 ml-64 bg-gray-100 min-h-full w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default AccountantProfile;
