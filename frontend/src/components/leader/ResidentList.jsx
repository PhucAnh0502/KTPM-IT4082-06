import React, { useState } from 'react';

const ResidentList = ({ residents }) => {
  const [openResident, setOpenResident] = useState(null);

  if (!residents || residents.length === 0) {
    return <div className="text-gray-500">No residents found.</div>;
  }

  return (
    <div>
      {residents.map(resident => (
        <div key={resident._id} className="mb-2">
          <button
            className="w-full text-left px-2 py-1 bg-blue-100 rounded"
            onClick={() => setOpenResident(openResident === resident._id ? null : resident._id)}
          >
            ResidentID: {resident._id} | Name: {resident.Name} | Relation: {resident.HouseHoldRelation}
          </button>
          {openResident === resident._id && (
            <div className="ml-4 mt-1 p-2 bg-white border rounded">
              <div><strong>Name:</strong> {resident.Name}</div>
              <div><strong>CID:</strong> {resident.CID}</div>
              <div><strong>Phone:</strong> {resident.PhoneNumber}</div>
              <div><strong>Relation:</strong> {resident.HouseHoldRelation}</div>
              {/* Add more resident info as needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResidentList;