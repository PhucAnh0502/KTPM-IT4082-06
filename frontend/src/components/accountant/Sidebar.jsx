import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarCheck,
  FaCog,
  FaDumbbell,
  FaFileAlt,
  FaTachometerAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaHome,
  FaUserShield,
} from "react-icons/fa";

const Sidebar = () => {
  const role = localStorage.getItem("accountRole")?.toLowerCase() || "resident";

  const getMenuItems = () => {
    const commonItems = [
      {
        path: `/${role}-dashboard`,
        icon: <FaTachometerAlt className="text-xl" />,
        label: "Dashboard",
        roles: ["admin", "leader", "resident", "accountant"]
      },      
    ];

    const roleSpecificItems = [
      // Admin specific items
      {
        path: `/${role}-dashboard/users`,
        icon: <FaUsers className="text-xl" />,
        label: "Users Management",
        roles: ["admin"]
      },
      {
        path: `/${role}-dashboard/rooms`,
        icon: <FaBuilding className="text-xl" />,
        label: "Rooms",
        roles: ["admin", "leader"]
      },
      {
        path: `/${role}-dashboard/maintenance`,
        icon: <FaCog className="text-xl" />,
        label: "Maintenance",
        roles: ["admin", "leader"]
      },
      // Leader specific items
      {
        path: `/${role}-dashboard/residents`,
        icon: <FaUsers className="text-xl" />,
        label: "Residents",
        roles: ["leader"]
      },
      // Accountant specific items
      {
        path: `/${role}-dashboard/payments`,
        icon: <FaMoneyBillWave className="text-xl" />,
        label: "Payments",
        roles: ["accountant"]
      },
      {
        path: `/${role}-dashboard/reports`,
        icon: <FaFileAlt className="text-xl" />,
        label: "Financial Reports",
        roles: ["accountant"]
      },
      // Resident specific items
      {
        path: `/${role}-dashboard/my-room`,
        icon: <FaHome className="text-xl" />,
        label: "My Room",
        roles: ["resident"]
      },
      {
        path: `/${role}-dashboard/payment-history`,
        icon: <FaMoneyBillWave className="text-xl" />,
        label: "Payment History",
        roles: ["resident"]
      }
    ];

    return [...commonItems, ...roleSpecificItems].filter(item => 
      item.roles.includes(role)
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold capitalize">{role} Dashboard</h2>
      </div>

      {/* NavLinks */}
      <div className="space-y-3 mt-4">
        {getMenuItems().map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `${
                isActive ? "bg-blue-400" : "hover:bg-blue-600"
              } flex items-center space-x-4 block py-3 px-6 rounded-lg transition-colors duration-300`
            }
            end={item.path === `/${role}-dashboard`}
          >
            {item.icon}
            <span className="text-lg">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
