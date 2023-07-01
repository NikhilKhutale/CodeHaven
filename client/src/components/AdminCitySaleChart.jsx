import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { stateSales } from '../data';

const StateSalesData = async () => {

    const data = stateSales
    return {
        labels: data.states,
        datasets: [
            {
                label: 'State Wise Sales',
                data: data.sales,
                fill: true,
                backgroundColor: '#48b7fd',
                borderColor: '#33affd',
                borderWidth: 1,
            }
        ],
    };
};

const AdminCitySaleChart = () => {

    const [chartData, setChartData] = useState({});

    const fetchChartData = async () => {
        const data = await StateSalesData()
        setChartData(data);
    };

    useEffect(() => {
        fetchChartData();
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'State Wise Sales',
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
        <div>
            {chartData && chartData.datasets && chartData.labels && <Bar options={chartOptions} data={chartData} />}
        </div>
    )
}

export default AdminCitySaleChart