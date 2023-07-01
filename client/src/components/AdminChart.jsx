import React, { useEffect, useState } from 'react'
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { monthlySales, ysearlySales } from '../data';


const fetchMonthlySalesData = async () => {

    const data = monthlySales
    return {
        labels: data.months,
        datasets: [
            {
                label: 'Monthly Sales',
                data: data.sales,
                fill: false,
                backgroundColor: '#48b7fd',
                borderColor: '#33affd',
                borderWidth: 1,
            },
        ],
    };
};

const fetchYearlySalesData = async () => {

    const data = ysearlySales
    return {
        labels: data.years,
        datasets: [
            {
                label: 'Yearly Sales',
                data: data.sales,
                fill: false,
                backgroundColor: '#48b7fd',
                borderColor: '#33affd',
                borderWidth: 1,
            },
        ],
    };
};


const AdminChart = () => {

    const [chartData, setChartData] = useState({});
    const [dataType, setDataType] = useState('monthly');

    const fetchChartData = async () => {
        const data = dataType === 'monthly' ? await fetchMonthlySalesData() : await fetchYearlySalesData();
        setChartData(data);
    };

    useEffect(() => {
        fetchChartData();
    }, [dataType]);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: dataType === 'monthly' ? 'Monthly Sales' : 'Yearly Sales',
                align: 'start',
                color: '#191C24',
                font: {
                    family: "'Poppins', 'sans-serif'",
                    weight: '700',
                    size: 16,
                    lineHeight: 1.2
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        animation: {
            onComplete: () => {
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default') {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
            easing: 'easeOutQuad',
        },
        transitions: {
            show: {
                animations: {
                    x: {
                        from: 0
                    },
                    y: {
                        from: 0
                    }
                }
            },
            hide: {
                animations: {
                    x: {
                        to: -10
                    },
                    y: {
                        to: 0
                    }
                }
            }
        },
    };

    return (
        <div className='text-center'>
            <div className="d-flex justify-content-center">
                <button onClick={() => setDataType('monthly')} className="button-primary me-1 d-none d-md-block">Monthly Sales</button>
                <button onClick={() => setDataType('yearly')} className="secondary-button ms-1 d-none d-md-block">Yearly Sales</button>
                <button onClick={() => setDataType('monthly')} className="button-primary me-1 d-block d-md-none">M</button>
                <button onClick={() => setDataType('yearly')} className="secondary-button ms-1 d-block d-md-none">Y</button>
            </div>
            {chartData && chartData.datasets && chartData.labels && <Bar options={chartOptions} data={chartData} />}
        </div>
    )
}

export default AdminChart