import React from 'react';
import { useState, useEffect } from 'react';
import { accountApi, 
        residentApi, 
        householdApi, 
        vehicleApi, 
        feeApi, 
        feeCollectionApi, 
        paymentApi } from '../../services/api';
import SummaryCard from './SummaryCard';
import StatisticsCharts from './StatisticsCharts';
import { FaUsers, FaHome, FaCar, FaMoneyBillWave, FaFileInvoiceDollar, FaCreditCard } from 'react-icons/fa';

const AdminSummary = () => {
    const [accounts, setAccounts] = useState([]);
    const [residents, setResidents] = useState([]);
    const [households, setHouseholds] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [fees, setFees] = useState([]);
    const [feeCollections, setFeeCollections] = useState([]);
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [
                    accountsRes,
                    residentsRes,
                    householdsRes,
                    vehiclesRes,
                    feesRes,
                    feeCollectionsRes,
                    paymentsRes
                ] = await Promise.all([
                    accountApi.getAllAccounts(),
                    residentApi.getAllResidents(),
                    householdApi.getAllHouseholds(),
                    vehicleApi.getAllVehicles(),
                    feeApi.getAllFees(),
                    feeCollectionApi.getAllFeeCollections(),
                    paymentApi.getAllPayments()
                ]);

                setAccounts(accountsRes.data.accounts);
                setResidents(residentsRes.data.residents);
                setHouseholds(householdsRes.data.houseHolds);
                setVehicles(vehiclesRes.data.vehicles);
                setFees(feesRes.data.fees);
                setFeeCollections(feeCollectionsRes.data.feeCollections);
                setPayments(paymentsRes.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error.message}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Admin Summary</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SummaryCard 
                    icon={<FaUsers />}
                    text="Total Accounts"
                    number={accounts.length}
                    color="bg-blue-500"
                />
                 <SummaryCard 
                    icon={<FaUsers />}
                    text="Total Residents"
                    number={residents.length}
                    color="bg-green-500"
                /> 
                 <SummaryCard 
                    icon={<FaHome />}
                    text="Total Households"
                    number={households.length}
                    color="bg-purple-500"
                /> 
                 <SummaryCard 
                    icon={<FaCar />}
                    text="Total Vehicles"
                    number={vehicles.length}
                    color="bg-yellow-500"
                /> 
                <SummaryCard 
                    icon={<FaMoneyBillWave />}
                    text="Total Fees"
                    number={fees.length}
                    color="bg-red-500"
                /> 
                <SummaryCard 
                    icon={<FaFileInvoiceDollar />}
                    text="Total Fee Collections"
                    number={feeCollections.length}
                    color="bg-indigo-500"
                /> 
            </div>

            {/* Statistics Charts */}
            <StatisticsCharts 
                feeCollections={feeCollections}
                payments={payments}
                fees={fees}
            />
        </div>
    );
}

export default AdminSummary;