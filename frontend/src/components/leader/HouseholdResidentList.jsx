import React, { useEffect, useState } from 'react';
import { getAllHouseholds } from '../../services/householdService';
import { getAllResidents } from '../../services/residentService';
import ResidentList from './ResidentList';
const HouseholdResidentList = () => {
  const [households, setHouseholds] = useState([]);
  const [residents, setResidents] = useState([]);
  const [openHousehold, setOpenHousehold] = useState(null);
  const [openResident, setOpenResident] = useState(null);

  useEffect(() => {
    getAllHouseholds().then(data => setHouseholds(data.households || []));
    getAllResidents().then(data => setResidents(data.residents || []));
  }, []);

  // Group residents by household ID
  const residentsByHousehold = households.reduce((acc, hh) => {
    acc[hh._id] = residents.filter(r => 
      Array.isArray(r.HouseHoldID) 
        ? r.HouseHoldID.includes(hh._id) 
        : r.HouseHoldID === hh._id
    );
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Households</h2>
      {households.map(hh => (
        <div key={hh._id} className="mb-4 border rounded shadow">
          <button
            className="w-full text-left px-4 py-2 bg-gray-200 font-semibold"
            onClick={() => setOpenHousehold(openHousehold === hh._id ? null : hh._id)}
          >
            Household ID: {hh._id} | Head: {hh.HouseholdHeadName} | Address: {hh.Address}
          </button>
          {openHousehold === hh._id && (
            <div className="pl-6 py-2 bg-gray-50">
              <ResidentList residents={residentsByHousehold[hh._id]} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HouseholdResidentList;