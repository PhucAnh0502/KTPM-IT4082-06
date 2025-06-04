import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const StatisticsCharts = ({ feeCollections, payments, fees }) => {
    // Tính toán số tiền thu được theo từng fee collection
    const calculateCollectionRevenue = () => {
        const collectionRevenue = {};
        
        // Khởi tạo revenue cho tất cả collections
        feeCollections.forEach(collection => {
            collectionRevenue[collection.Name] = 0;
        });

        // Tính toán revenue dựa trên FeeCollectionID
        fees.forEach(fee => {
            if (fee.FeeCollectionID) {
                const collection = feeCollections.find(fc => fc._id === fee.FeeCollectionID);
                
                if (collection) {
                    const feePayments = payments.filter(payment => 
                        payment.FeeID === fee._id && payment.Status === 'Paid'
                    );
                    
                    const totalAmount = feePayments.reduce((sum, payment) => 
                        sum + payment.Amount, 0
                    );
                    
                    collectionRevenue[collection.Name] += totalAmount;
                }
            }
        });

        return collectionRevenue;
    };

    // Tính toán số tiền thu được theo từng loại phí
    const calculateFeeTypeRevenue = () => {
        const feeTypeRevenue = {};
        
        fees.forEach(fee => {
            const feePayments = payments.filter(payment => 
                payment.FeeID === fee._id && payment.Status === 'Paid'
            );
            
            const totalAmount = feePayments.reduce((sum, payment) => 
                sum + payment.Amount, 0
            );
            
            feeTypeRevenue[fee.feeName] = totalAmount;
        });

        return feeTypeRevenue;
    };

    const collectionRevenue = calculateCollectionRevenue();
    const feeTypeRevenue = calculateFeeTypeRevenue();

    const collectionChartData = {
        labels: Object.keys(collectionRevenue),
        datasets: [
            {
                label: 'Revenue by Collection (VND)',
                data: Object.values(collectionRevenue),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 1,
            },
        ],
    };

    const feeTypeChartData = {
        labels: Object.keys(feeTypeRevenue),
        datasets: [
            {
                label: 'Revenue by Fee Type (VND)',
                data: Object.values(feeTypeRevenue),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue Statistics',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return value.toLocaleString('vi-VN') + ' VND';
                    }
                }
            }
        }
    };

    return (
        <div className="mt-8 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Revenue by Fee Collection</h2>
                <Bar data={collectionChartData} options={chartOptions} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Revenue by Fee Type</h2>
                <Bar data={feeTypeChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default StatisticsCharts; 