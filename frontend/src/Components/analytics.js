import React, { Fragment, useState, useEffect } from 'react';
// import testAnalytics from './TestData/testAnalytics';

const bestCustTable = (freqcus) => {


    return (
        <div className='contianer border rounded-15 shadow m-5 analytics-table'>

            <h4>Most Frequent Customers</h4>
            <table className='table table-hover'>
                <tbody>
                    {freqcus.map((each, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{each.name}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>

    );
}
const bestDelTable = (bestdel) => {
    return (
        <div className='contianer border rounded-15 shadow m-5 analytics-table'>

            <h4>Best Delivery People</h4>
            <table className='table table-hover'>
                <tbody>
                    {bestdel.map((each, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{each.name}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>

    );
}
const bestDishTable = (bestdish) => {
    return (
        <div className='contianer border rounded-15 shadow m-5 analytics-table'>

            <h4>Most Ordered Dish</h4>
            <table className='table table-hover'>
                <tbody>
                    {bestdish.map((each, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{each.dish_name}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>

    );
}

const bestRatedTable = (bestrate) => {
    return (
        <div className='contianer border rounded-15 shadow m-5 analytics-table'>

            <h4>Most Rated Dishes</h4>
            <table className='table table-hover'>
                <tbody>
                    {bestrate.map((each, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{each.dish_name}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>

    );
}
const bestDayTable = (bestday) => {
    return (
        <div className='contianer border rounded-15 shadow m-5 analytics-table'>

            <h4>Most Busy Days</h4>
            <table className='table table-hover'>
                <tbody>
                    {bestday.map((each, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{each.dat.slice(0, 10)}</td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>

    );
}


const Analytics = () => {

    const [freqcus, setfreqcus] = useState([]);
    const [bestdel, setbestdel] = useState([]);
    const [bestday, setbestday] = useState([]);
    const [bestdish, setbestdish] = useState([]);
    const [rateddish, setrateddish] = useState([]);


    const GetBestDish = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_dish", { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log("getbestDish : ", jsonData)
            if (jsonData.success) {
                setbestdish(jsonData.data);
            }
            else {
                alert(jsonData.message + " in Best Dish");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetRatedDish = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(
                process.env.REACT_APP_BACKEND_SERVER + "/analytics/most_rated_dishes",
                { credentials: 'include' },
            )
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log("getbestDish : ", jsonData)
            if (jsonData.success) {
                setrateddish(jsonData.data);
            }
            else {
                alert(jsonData.message + " in Best Dish");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetBestDel = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_delivery", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log("GetBestDel : ", jsonData)

            if (jsonData.success) {
                setbestdel(jsonData.data);
            }
            else {
                alert(jsonData.message + " in BestDel");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetBestDay = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_day", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log("GetBestDay : ", jsonData)

            if (jsonData.success) {
                setbestday(jsonData.data);
            }
            else {
                alert(jsonData.message + " in BestDay");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetFreqCus = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_freq_customers", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            console.log("GetFreqCus : ", jsonData)
            if (jsonData.success) {
                setfreqcus(jsonData.data);
            }
            else {
                alert(jsonData.message + " in FreqCus");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    useEffect(() => {
        GetBestDish();
        GetBestDay();
        GetFreqCus();
        GetBestDel();
        GetRatedDish();
    }, [])


    return (
        <Fragment>



            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        {bestCustTable(freqcus)}

                    </div>
                    <div className='col-md-6'>
                        {bestDelTable(bestdel)}

                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        {bestDishTable(bestdish)}

                    </div>
                    <div className='col-md-6'>
                        {bestDayTable(bestday)}

                    </div>
                </div>

                <div className="row">
                    <div className='col-md-3'></div>
                    <div className='col-md-6'>
                        {bestRatedTable(rateddish)}
                    </div>
                    <div className='col-md-3'></div>
                </div>

            </div>

        </Fragment>
    );
};



export default Analytics;
