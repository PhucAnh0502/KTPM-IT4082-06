import React, { useState, useEffect } from 'react';
import { getFee } from '../../../services/feeService';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllFeeCollections } from '../../../services/feeCollectionService';

const ViewDetailsFee = () => {
  const { id } = useParams();
  const [fee, setFee] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feeData, collectionsData] = await Promise.all([
          getFee(id),
          getAllFeeCollections()
        ]);
        setFee(feeData.fee);
        if (collectionsData?.feeCollections) {
          setCollections(collectionsData.feeCollections);
        }
      } catch (err) {
        setError('Failed to fetch fee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getCollectionName = (collectionId) => {
    const collection = collections.find(col => col._id === collectionId);
    return collection ? collection.Name : 'N/A';
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  
  if (!fee) return <div className="p-6 text-center text-red-600">No fee details found</div>;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-center mb-6">Fee Details</h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="space-y-4">
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Fee ID:</span>
                <span>{fee._id}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Fee Type:</span>
                <span>{fee.FeeType}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Description:</span>
                <span>{fee.Description}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Fee Name:</span>
                <span>{fee.feeName}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Collection:</span>
                <span>{getCollectionName(fee.FeeCollectionID)}</span>
              </p>
              <p className="flex justify-between border-b pb-2">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(fee.createdAt).toLocaleString()}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-semibold">Updated At:</span>
                <span>{new Date(fee.updatedAt).toLocaleString()}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <button 
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              onClick={() => navigate('/leader-dashboard/fees')}
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsFee;
