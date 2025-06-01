import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarCheck,
  FaCog,
  FaDumbbell,
  FaFileInvoiceDollar,
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
      {
        path: `/${role}-dashboard/users`,
        icon: <FaUserShield className="text-xl" />,
        label: "Users Management",
        roles: ["admin"]
      },
      {
        path: `/${role}-dashboard/fees`,
        icon: <FaMoneyBillWave className="text-xl" />,
        label: "Fee Management",
        roles: ["admin"]
      },
      {
        path: `/${role}-dashboard/fee-collections`,
        icon: <FaFileInvoiceDollar className="text-xl" />,
        label: "Fee Collections",
        roles: ["admin", "leader"]
      },
      {
        path: `/${role}-dashboard/households`,
        icon: <FaBuilding className="text-xl" />,
        label: "Household",
        roles: ["admin", "leader"]
      },
      {
        path: `/${role}-dashboard/residents`,
        icon: <FaUsers className="text-xl" />,
        label: "Residents",
        roles: ["admin"]
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

    return [...commonItems].filter(item => 
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
