import React from 'react'
import AdminChart from './AdminChart'
import AdminCitySaleChart from './AdminCitySaleChart'
import AdminSalesRevenuChart from './AdminSalesRevenuChart'
import AdminStateSalesChart from './AdminStateSalesChart'

const variousCharts = [<AdminChart />, <AdminSalesRevenuChart />, <AdminStateSalesChart />, <AdminCitySaleChart />]

const AdminHome = () => {
    const salesRevenu = [
        {
            id: 1,
            icon: <i className="fa-solid fa-chart-line fa-3x"></i>,
            title: 'Today Sale',
            value: '₹ 499'
        },
        {
            id: 2,
            icon: <i className="fa-solid fa-chart-column fa-3x"></i>,
            title: 'Total Sale',
            value: '₹ 49'
        },
        {
            id: 3,
            icon: <i className="fa-solid fa-chart-area fa-3x"></i>,
            title: 'Monthly Sale',
            value: '₹ 4'
        },
        {
            id: 4,
            icon: <i className="fa-solid fa-chart-pie fa-3x"></i>,
            title: 'Total Revenu',
            value: '₹ 49995'
        }
    ]
    return (
        <>
            <div className="container my-5 px-5" >
                <div className="row gap-2 gap-lg-5 justify-content-center">
                    {salesRevenu.map((item) => (
                        <div key={item.id} className='col-md-5 col-lg-2 py-3 px-4 d-flex justify-content-around rounded' style={{backgroundColor: "#e3f2fd"}}>
                                {item.icon}
                                <div>
                                    <p className="mb-0">{item.title}</p>
                                    <p className="mb-0">{item.value}</p>
                                </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container px-5 mb-5">
                <div className='row gap-2 gap-lg-5 justify-content-center'>
                    {variousCharts.map((chart) => (
                        <div key={chart} className="col-lg-5 py-3 px-4 rounded charts" style={{backgroundColor: "#e3f2fd"}}>
                            {chart}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AdminHome