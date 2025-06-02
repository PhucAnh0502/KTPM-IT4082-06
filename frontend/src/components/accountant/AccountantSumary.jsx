// components/accountant/DashboardSummary.jsx
import React from 'react';

const AccountantSummary = () => {
    // These would typically come from API calls
    const stats = {
        totalFees: 150,
        unpaidFees: 25,
        paidFees: 125,
        totalAmount: '50,000,000'
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Total Fees */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Tổng phí thu</h3>
                <p className="text-2xl font-bold">{stats.totalFees}</p>
            </div>
            
            {/* Unpaid Fees */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Phí chưa thu</h3>
                <p className="text-2xl font-bold">{stats.unpaidFees}</p>
            </div>
            
            {/* Paid Fees */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Phí đã thu</h3>
                <p className="text-2xl font-bold">{stats.paidFees}</p>
            </div>
            
            {/* Total Amount */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Tổng số tiền</h3>
                <p className="text-2xl font-bold">đ{stats.totalAmount}</p>
            </div>
        </div>
    );
};

export default AccountantSummary;