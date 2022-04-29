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

            <div className='border p-2 mt-3 pb-0 shadow rounded'>
                <div className='row'>
                    {/* Left picture */}
                    <div className={`col-sm-4  d-flex justify-content-center
                 align-items-center ` + setBgColor(order)}>

                        {(order.order_type !== "Online") &&
                            <h1><i className='fa fa-table'></i>  {order.table_id} </h1>
                        }
                        {(order.order_type === "Online") &&
                            <h1><i className='fa fa-globe'></i> </h1>
                        }

                    </div>

                    {/* Right Elemental */}
                    <div className='col-sm-8'>
                        <h3><b>ID </b> : {order.order_id} - {order.order_type} </h3>

                        <h5>Recieved Time : {order.received_time}</h5>
                        {(order.status === "Preparing") &&
                            <h5 className='text-success'> <b> Status : {order.status} </b></h5>
                        }
                        {!(order.status === "Preparing") &&
                            <h5> <b> Status : {order.status} </b></h5>
                        }
                        <h5>Total Dishes : {(order.dishes).length}</h5>

                        {/* {(order.dishes).map(dish => (
                            <p className='m-0'>{dish.dish_name} x{dish.quantity}</p>
                        ))} */}
                    </div>
                    {/* <!-- Button to Open the Modal --> */}
                    <button type="button" class="btn btn-light mt-2 " data-bs-toggle="modal" data-bs-target={"#myModalPrevOrder" + order.order_id}>
                        Expand
                    </button>
                </div>

            </div>


            {/* <!-- The Modal --> */}
            <div class="modal" id={"myModalPrevOrder" + order.order_id}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h4 class="modal-title"><b>ID </b> : {order.order_id} - {order.order_type} </h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div class="modal-body">

                            <div className=' ps-4 pe-4'>
                                <div className='d-flex flex-column align-items-start'>

                                    <h5>Recieved Time : {order.received_time}</h5>
                                    <h5>Finished Time : {order.finished_time}</h5>
                                    <h5>Delivered Time : {order.delivered_time}</h5>
                                    <h5>Delivery Person : {order.delivery_person}</h5>
                                    {(order.status === "Preparing") &&
                                        <h5 className='text-success'> <b> Status : {order.status} </b></h5>
                                    }
                                    {!(order.status === "Preparing") &&
                                        <h5> <b> Status : {order.status} </b></h5>
                                    }
                                    <h5>Order Type : {order.order_type}</h5>

                                    <h5>Total Dishes : {(order.dishes).length}</h5>
                                    <hr></hr>
                                    <h5> Dishes : </h5>

                                    {(order.dishes).map(dish => (
                                        <div className='d-flex justify-content-between'>
                                            <p className='m-0'>{dish.dish_name} x{dish.quantity}</p>


                                        </div>
                                    ))}

                                </div>
                            </div>

                        </div>

                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </Fragment>
    );
};

function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}



const groupByOrder = (orders) => {
    var res = {}

    orders.forEach(order => {
        if (!(res[order.order_id])) {

            res[order.order_id] = {
                "order_id": order.order_id,
                "c_id": order.c_id,
                "area_id": order.area_id,
                "table_id": order.table_id,
                "dat": order.dat,
                "received_time": order.received_time,
                "finished_time": order.finished_time,
                "delivered_time": order.delivered_time,
                "delivery_person": order.delivery_person,
                "status": order.status,
                "order_type": order.order_type,

                "dishes": []
            }
        }
        res[order.order_id]["dishes"].push({
            "dish_id": order.dish_id,
            "quantity": order.quantity,
            "offer_id": order.offer_id,
            "dish_name": order.dish_name,
            "recipe": order.recipe,
            "time_taken": order.time_taken,
            "dish_type": order.dish_type,
            "cost": order.cost,
            "rating": order.rating,
            "photo": order.photo,
        })



    });

    res = json2array(res)

    return res;


}

const PrevOrder = ({token}) => {
    const user=token.data;

    const [ordersList, setOrdersList] = useState([]);


    const getOrdersList = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/previous_orders/1", {credentials: 'include'})
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOrdersList(groupByOrder(jsonData.data));
                console.log(ordersList)
            }
            else {
                alert(jsonData.message+"");
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

            <h2>Your Previous Orders :</h2>

            <p>Num orders : {ordersList.length}</p>

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
                    renderOnZeroPageCount={e => (<h3>Nothing to see here...</h3>)}

                />

            </div>

        </div>
    );
};



export default PrevOrder;
