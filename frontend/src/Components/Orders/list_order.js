import React, { Fragment, useEffect, useState } from 'react';

import testOrders from '../TestData/testOrders';


const createOrderElem = (order) => {
    return (
        <Fragment>
            <div className=' border  m-3 shadow rounded'>
                <h3><b>Order id </b> - {order.order_id} : {order.order_type} </h3>

                <h5>Recieved Time : {order.received_time}</h5>
                <h5> <u> Status : {order.status} </u></h5>
                {(order.order_type !== "Online") &&
                    <p>Table : {order.table_id} </p>
                }

            </div>

        </Fragment>
    );
};


const ListOrders = () => {


    const [ordersList, setOrdersList] = useState(testOrders);


    const getOffersList = async () => {
        try {

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/all")
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json()

            setOrdersList(jsonData.data);

        } catch (error) {

            console.error(error.message);

        }

    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        getOffersList();
    }, []);


    return (
        <div className=' container'>

            <h2>Orders Page</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {ordersList.map(order => (
                createOrderElem(order)
            ))}

        </div>
    );
};



export default ListOrders;
