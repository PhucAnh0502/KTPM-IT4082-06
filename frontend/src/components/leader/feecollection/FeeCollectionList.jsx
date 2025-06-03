import React, { useEffect, useState } from 'react';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const FeeCollectionList = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFeeCollections().then(data => {
      setCollections(data.feeCollections || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading fee collections...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fee Collections</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Create Date</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Fees</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(col => (
            <tr key={col._id}>
              <td className="border px-4 py-2">{col.Name}</td>
              <td className="border px-4 py-2">{new Date(col.CreateDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(col.DueDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                {Array.isArray(col.Fees) ? col.Fees.join(', ') : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* No edit/delete/create buttons for leader */}
    </div>
  );
};

export default FeeCollectionList;