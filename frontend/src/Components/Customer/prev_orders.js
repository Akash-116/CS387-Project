import React, { Fragment, useEffect, useState } from 'react';
import { Location } from 'react-router-dom';

import testOrders from '../TestData/testOrders';
import ReactPaginate from "react-paginate";



const CreateOrderElem = ({ order }) => {


    const setBgColor = (order) => {
        if (order.status === "Preparing") { return "bg-success" }
        else { return "bg-primary" }
    }


    return (
        <Fragment>

            <div className='border p-3 m-3 shadow rounded'>
                <div className='row'>
                    <div className={`col-sm-4  d-flex justify-content-center
                 align-items-center ` + setBgColor(order)}>

                        {(order.order_type !== "Online") &&
                            <h1><i className='fa fa-table'></i>  {order.table_id} </h1>
                        }
                        {(order.order_type === "Online") &&
                            <h1><i className='fa fa-globe'></i> </h1>
                        }

                    </div>
                    <div className='col-sm-8'>
                        <h3><b>ID </b> : {order.order_id} - {order.order_type} </h3>

                        <h5>Recieved Time : {order.received_time}</h5>
                        {(order.status === "Preparing") &&
                            <h5 className='text-success'> <b> Status : {order.status} </b></h5>
                        }
                        {!(order.status === "Preparing") &&
                            <h5> <b> Status : {order.status} </b></h5>
                        }
                    </div>
                </div>


            </div>

        </Fragment>
    );
};


const PrevOrder = () => {


    const [ordersList, setOrdersList] = useState([]);


    const getOrdersList = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/previous_orders/1")
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOrdersList(jsonData.data);
            }
            else {
                alert("Something Went Wrong");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);

        }

    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        getOrdersList();
    }, []);



    /* PAGINATION ELEMENTS */
    const ordersPerPage = 6;

    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * ordersPerPage;

    const ordersListPage = ordersList
        .slice(pagesVisited, pagesVisited + ordersPerPage)
        .map(order => (
            <CreateOrderElem order={order}></CreateOrderElem>
        ));

    const pageCount = Math.ceil(ordersList.length / ordersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    /* PAGINATION ELEMENTS */

    return (
        <div className=' container'>

            <h2>Orders Page</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {/* {ordersList.map(order => (
                <CreateOrderElem order={order}></CreateOrderElem>
            ))} */}

            {ordersListPage}

            {/* So elaborate classes, so that the bootstrap matches this pagination implementation */}
            <div className='container justify-content-center'>

                <ReactPaginate
                    previousLabel={"< "}
                    nextLabel={">"}
                    pageCount={pageCount}
                    onPageChange={changePage}

                    pageRangeDisplayed={1}
                    marginPagesDisplayed={2}

                    containerClassName={"pagination"}

                    breakClassName={"page-item"}
                    pageClassName={"page-item"}
                    previousClassName={"page-item"}
                    disabledClassName={"page-item"}
                    nextClassName={"page-item"}
                    activeClassName={"page-item bg-warning"}

                    pageLinkClassName={"page-link"}
                    breakLinkClassName={"page-link"}
                    activeLinkClassName={"page-link bg-info"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    disabledLinkClassName={"page-link"}
                />

            </div>

        </div>
    );
};



export default PrevOrder;
