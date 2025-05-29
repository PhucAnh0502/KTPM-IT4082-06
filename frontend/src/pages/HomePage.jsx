import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-12 bg-white shadow-lg rounded-lg mt-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Trang quản lý chung cư BlueMoon</h1>
      <p className="text-xl text-gray-600 mb-10">Xin chào! Vui lòng đăng nhập hoặc đăng ký để truy cập vào trang quản lý của bạn.</p>
      <div className="space-x-4">
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out text-lg">Đăng nhập</Link>
        <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out text-lg">Đăng ký</Link>
      </div>
    </div>
  );
};

export default HomePage; 