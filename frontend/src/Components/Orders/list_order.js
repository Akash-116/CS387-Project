import React, { Fragment, useState } from 'react';

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
