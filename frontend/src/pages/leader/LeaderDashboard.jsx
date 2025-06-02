import React from 'react';
import LeaderSidebar from '../../components/leader/LeaderSidebar';
import { Outlet } from 'react-router-dom';

const LeaderDashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <LeaderSidebar />
      <div className='flex-1 ml-64 bg-gray-100 min-h-full w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default LeaderDashboard;

