import React, { Fragment, useEffect, useState } from 'react';
import { Location } from 'react-router-dom';
import testOrders from '../TestData/testOrders';
import ReactPaginate from "react-paginate";



const CreateOrderElem = ({ order }) => {


    const setBgColor = (order) => {
        if (order.status === "Preparing") { return "bg-green-grad" }
        else {
            if (order.status === "Out for delivery") {

                return "bg-red-grad"
            }
            else { return "bg-blue-grad" }
        }
    }

    const markAsDone = async () => {

        try {
            var apiCmd;
            var finalState;
            var curState = order.status;
            var curType = order.order_type;
            if (curState === "Preparing") {
                apiCmd = "finished";
                if (curType === "Online") {
                    finalState = "Out for delivery"
                }
                else { finalState = "Served" }
            }
            else {
                if (curState === "Out for delivery") { apiCmd = "delivered"; finalState = "Served" }
            }

            console.log("order existing is : ", order)
            const newOrder = { ...order };
            newOrder.status = finalState;

            console.log("order sent is : ", newOrder)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + `/orders/${apiCmd}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
                credentials: 'include'
            });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (!jsonData.success) {
                alert(jsonData.message + "");
            }
            else {

                window.location.reload();
            }

        } catch (error) {
            console.error(error.message);

        }
    }

    return (
        <Fragment>

            <div className='border overflow-hidden m-3  shadow rounded-15'>
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
                    <div className='col-sm-8 d-flex flex-column align-items-start'>
                        <div className='d-flex justify-content-between align-self-stretch pe-4 mt-3'>
                            <h3><b>ID </b> : {order.order_id} - {order.order_type} </h3>
                            {(order.status === "Out for delivery") &&
                                <button className='btn btn-danger' onClick={e => markAsDone()}>
                                    Mark as Delivered
                                </button>
                            }
                            {(order.status === "Preparing") &&
                                <button className='btn btn-danger' onClick={e => markAsDone()}>
                                    Mark as Prepared
                                </button>
                            }
                        </div>
                        <hr className='align-self-stretch'></hr>
                        <p>Recieved Time : {order.received_time}</p>
                        {(order.status === "Preparing") &&
                            <p className='text-success'> <b> Status : {order.status} </b></p>
                        }
                        {!(order.status === "Preparing") &&
                            <p className='text-blue-dark'> <b> Status : {order.status} </b></p>
                        }
                    </div>
                </div>


            </div>

        </Fragment>
    );
};


const ListOrders = () => {


    const [ordersList, setOrdersList] = useState([]);
    const [ordersListLength, setOrdersListLength] = useState(0)


    /* PAGINATION ELEMENTS */
    const ordersPerPage = 6;

    const [pageNumber, setPageNumber] = useState(0);
    // const pageCount2 = 26;
    const [pageCount, setPageCount] = useState(6)

    /* PAGINATION ELEMENTS */

    const getOrdersListLength = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/all/count", { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOrdersListLength(jsonData.data);

                setPageCount(Math.ceil(jsonData.data.count / ordersPerPage));
                // console.log("jsondata : ", jsonData.data)
            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);

        }

    }


    const getOrdersList = async (offset, limit) => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + `/orders/all?offset=${offset}&limit=${limit}`, { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOrdersList(jsonData.data);
                console.log("PageCount set to : ", Math.ceil(jsonData.data / ordersPerPage))

            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);

        }

    }

    useEffect(() => {
        getOrdersListLength();
        getOrdersList(0, ordersPerPage);
    }, []);


    /* PAGINATION ELEMENTS */
    // const pagesVisited = pageNumber * ordersPerPage;
    const ordersListPage = ordersList
        // .slice(pagesVisited, pagesVisited + ordersPerPage)
        .map(order => (
            <CreateOrderElem order={order}></CreateOrderElem>
        ));

    // setPageCount(Math.ceil(ordersListLength / ordersPerPage));

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        getOrdersList(selected * ordersPerPage, ordersPerPage);
    };

    /* PAGINATION ELEMENTS */



    return (
        <div className=' container'>

            <h2>Orders Page - {pageNumber}</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {/* {ordersList.map(order => (
                <CreateOrderElem order={order}></CreateOrderElem>
            ))} */}

            {ordersListPage}

            {/* So elaborate classes, so that the bootstrap matches this pagination implementation */}
            <div className='container d-flex   p-2 justify-content-center'>
                <div className=''>

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
                        renderOnZeroPageCount={e => (<h3>Nothing to see here...</h3>)}

                    />
                </div>

            </div>

        </div>
    );
};



export default ListOrders;
