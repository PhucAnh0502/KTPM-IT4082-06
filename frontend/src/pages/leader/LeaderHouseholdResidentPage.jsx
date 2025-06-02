import React from 'react';
import HouseholdResidentList from '../../components/leader/HouseHoldResidentList';

const HouseholdResidentPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <main className="flex-1 p-6">
      <HouseholdResidentList />
    </main>
  </div>
);

export default HouseholdResidentPage;
