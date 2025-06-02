import React, { useEffect, useState } from 'react';
import { getAllFees } from '../../services/feeService';

const FeeList = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFees().then(data => {
      setFees(data.fees || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading fees...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fee List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Fee Name</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Collection</th>
          </tr>
        </thead>
        <tbody>
          {fees.map(fee => (
            <tr key={fee._id}>
              <td className="border px-4 py-2">{fee.feeName}</td>
              <td className="border px-4 py-2">{fee.FeeType}</td>
              <td className="border px-4 py-2">{fee.Description}</td>
              <td className="border px-4 py-2">{fee.FeeCollectionID}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* No edit/delete/create buttons for leader */}
    </div>
  );
};

export default FeeList;