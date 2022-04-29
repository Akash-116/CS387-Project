import React, { Fragment,useState,useEffect } from 'react';
// import testAnalytics from './TestData/testAnalytics';

const Analytics = () => {

    const [freqcus, setfreqcus] = useState({});
    const [bestdel, setbestdel] = useState({});
    const [bestday, setbestday] = useState({});
    const [bestdish, setbestdish] = useState({});


    const GetBestDish = async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_dish", {credentials: 'include'})
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setbestdish(jsonData.data);
            }
            else{
                alert(jsonData.message+" in Best Dish");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetBestDel = async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_delivery", {credentials: 'include'});
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setbestdel(jsonData.data);
            }
            else{
                alert(jsonData.message+" in BestDel");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetBestDay = async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_best_day", {credentials: 'include'});
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setbestday(jsonData.data);
            }
            else{
                alert(jsonData.message+" in BestDay");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);
            alert('Error connecting to Database');
        }
    }

    const GetFreqCus = async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/analytics/get_freq_customers", {credentials: 'include'});
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setfreqcus(jsonData.data);
            }
            else{
                alert(jsonData.message+" in FreqCus");
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
    }, [])
    

    return (
        <Fragment>



            <div className='container'>
                <h2>Analytics</h2>
                <table class="table table-hover">
                    <tbody>
                        <tr></tr>
                        <tr>
                            <td>Most Frequent Customer</td>
                            <td>{freqcus.name} </td>
                        </tr>
                        <tr>
                            <td>Best Delivery Person</td>
                            <td>{bestdel.name} </td>
                        </tr>
                        <tr>
                            <td>Most Ordered Dish</td>
                            <td>{bestdish.dish_name}</td>
                        </tr>
                        <tr>
                            <td>Day with Most Orders</td>
                            <td>{bestday.dat}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </Fragment>
    );
};



export default Analytics;
