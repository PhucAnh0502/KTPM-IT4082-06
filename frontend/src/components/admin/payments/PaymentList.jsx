import React, { useState, useEffect } from 'react';
import { getFee } from '../../../services/feeService';
import { getHousehold } from '../../../services/householdService';
import { getAllPayments, deletePayment, updatePayment } from '../../../services/paymentService';
import { getResident } from '../../../services/residentService';
import { FaTrash, FaSearch, FaFilter, FaEdit } from 'react-icons/fa';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState({});
  const [householdHeads, setHouseholdHeads] = useState({});
  const [householdAddresses, setHouseholdAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    address: '',
    status: '',
    feeName: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsData = await getAllPayments();
        
        if (paymentsData?.data) {
          setPayments(paymentsData.data);
          
          // Fetch fee details for each payment
          const feePromises = paymentsData.data.map(payment => 
            getFee(payment.FeeID)
          );
          const feeResults = await Promise.all(feePromises);
          
          const feeMap = {};
          feeResults.forEach(result => {
            if (result?.fee) {
              feeMap[result.fee._id] = result.fee;
            }
          });
          setFees(feeMap);

          // Fetch household and resident details for each payment
          const headNames = {};
          const addresses = {};
          for (const payment of paymentsData.data) {
            try {
              const householdData = await getHousehold(payment.HouseHoldID);
              if (householdData?.houseHold) {
                // Store address
                addresses[payment.HouseHoldID] = householdData.houseHold.Address || 'N/A';
                
                // Get household head name
                if (householdData.houseHold.HouseHoldHeadID) {
                  const residentData = await getResident(householdData.houseHold.HouseHoldHeadID);
                  if (residentData?.resident) {
                    headNames[payment.HouseHoldID] = residentData.resident.Name;
                  }
                }
              }
            } catch (err) {
              console.error('Error fetching household/resident data:', err);
              headNames[payment.HouseHoldID] = 'N/A';
              addresses[payment.HouseHoldID] = 'N/A';
            }
          }
          setHouseholdHeads(headNames);
          setHouseholdAddresses(addresses);
        }
      } catch (err) {
        setError('Failed to fetch payment data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await deletePayment(paymentId);
        setPayments(payments.filter(payment => payment._id !== paymentId));
      } catch (err) {
        setError('Failed to delete payment');
        console.error(err);
      }
    }
  };

  const handleStatusChange = async (paymentId, newStatus) => {
    try {
      const payment = payments.find(p => p._id === paymentId);
      if (!payment) return;

      const updateData = {
        FeeID: payment.FeeID,
        HouseHoldID: payment.HouseHoldID,
        Amount: payment.Amount,
        Status: newStatus,
        PayDate: newStatus === 'Paid' ? new Date().toISOString() : undefined
      };

      await updatePayment(paymentId, updateData);
      
      // Update local state
      setPayments(payments.map(p => 
        p._id === paymentId 
          ? { 
              ...p, 
              Status: newStatus, 
              PayDate: newStatus === 'Paid' ? new Date().toISOString() : null 
            }
          : p
      ));
      
      setEditingStatus(null);
    } catch (err) {
      setError('Failed to update payment status');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredPayments = payments.filter(payment => {
    const householdHead = householdHeads[payment.HouseHoldID] || '';
    const address = householdAddresses[payment.HouseHoldID] || '';
    const feeName = fees[payment.FeeID]?.feeName || '';

    const matchesSearch = householdHead.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAddress = !filters.address || address.toLowerCase().includes(filters.address.toLowerCase());
    const matchesStatus = !filters.status || payment.Status.toLowerCase() === filters.status.toLowerCase();
    const matchesFeeName = !filters.feeName || feeName.toLowerCase().includes(filters.feeName.toLowerCase());

    return matchesSearch && matchesAddress && matchesStatus && matchesFeeName;
  });

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Payment List</h2>
          
          {/* Search and Filter Section */}
          <div className="mb-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search by household head name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="p-2 border rounded-lg hover:bg-gray-50"
                title="Filter"
              >
                <FaFilter className="text-gray-600" />
              </button>
            </div>

            {/* Filter Panel */}
            {showFilter && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={filters.address}
                      onChange={(e) => handleFilterChange('address', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Filter by address..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Name</label>
                    <input
                      type="text"
                      value={filters.feeName}
                      onChange={(e) => handleFilterChange('feeName', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Filter by fee name..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Household Head</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {fees[payment.FeeID]?.feeName || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {householdAddresses[payment.HouseHoldID] || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {householdHeads[payment.HouseHoldID] || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.Amount?.toLocaleString('vi-VN')} VND
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.PayDate ? new Date(payment.PayDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === payment._id ? (
                        <div className="relative">
                          <select
                            value={payment.Status}
                            onChange={(e) => handleStatusChange(payment._id, e.target.value)}
                            className="block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onBlur={() => setEditingStatus(null)}
                            autoFocus
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Failed">Failed</option>
                          </select>
                        </div>
                      ) : (
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.Status)} cursor-pointer hover:opacity-80`}
                          onClick={() => setEditingStatus(payment._id)}
                        >
                          {payment.Status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleDelete(payment._id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        title="Delete payment"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentList;
