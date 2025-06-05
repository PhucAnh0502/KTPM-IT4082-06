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
        label: "Fee Management",
        roles: ["accountant"]
      },
      {
        path: `/${role}-dashboard/fee-collections`,
        icon: <FaFileAlt className="text-xl" />,
        label: "Fee Collection",
        roles: ["accountant"]
      },
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
