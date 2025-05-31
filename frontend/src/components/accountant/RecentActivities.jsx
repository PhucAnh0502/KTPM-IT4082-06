// components/accountant/RecentActivities.jsx
import React from 'react';

const RecentActivities = () => {
    const activities = [
        { id: 1, description: 'Phí điện tháng 5 đã được tạo', time: '2 giờ trước' },
        { id: 2, description: 'Phí nước tháng 5 đã được cập nhật', time: '4 giờ trước' }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold mb-4">Hoạt động gần đây</h2>
            <ul className="space-y-3">
                {activities.map(activity => (
                    <li key={activity.id} className="flex justify-between items-center border-b pb-2">
                        <span>{activity.description}</span>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentActivities;