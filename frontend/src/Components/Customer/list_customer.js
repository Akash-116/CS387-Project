import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";



const CreateCustElem = ({ cust }) => {




    return (
        <Fragment>

            <div className='border   mt-3 shadow rounded-15 overflow-hidden'>
                <div className='row'>
                    <div className='col-sm-3 bg-pink-grad d-flex justify-content-center
                 align-items-center'>

                        <i className='fa-3x fas fa-user-tag'></i>
                    </div>
                    <div className='col-sm-7 mb-3'>
                        <div className='mt-3 pb-1 ms-3 d-flex flex-column align-items-start'>

                            <h3><b></b>{cust.name} </h3>
                            <hr className='align-self-stretch m-1 '></hr>
                            <p className='mb-0'><b>Ph.No. </b> : {cust.ph_no} </p>
                            <p className='mb-0'><b>Address </b> : {cust.addr} </p>
                            <p className='mb-0'><b>No. Orders </b> : {cust.num_orders} </p>
                            <p className='mb-0'><b>No. Dishes </b> : {cust.num_dish} </p>
                        </div>


                    </div>
                </div>


            </div>

        </Fragment>
    );
};


const ListCustomers = () => {


    const [customersList, setCustomersList] = useState([]);


    const getCustomersList = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/all", { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setCustomersList(jsonData.data);
            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
            }

        } catch (error) {
            console.error(error.message);

        }

    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        getCustomersList();
    }, []);


    /* PAGINATION ELEMENTS */
    const customersPerPage = 6;

    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * customersPerPage;

    const customersListPage = customersList
        .slice(pagesVisited, pagesVisited + customersPerPage)
        .map(cust => (
            <CreateCustElem cust={cust}></CreateCustElem>
        ));

    const pageCount = Math.ceil(customersList.length / customersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    /* PAGINATION ELEMENTS */

    return (
        <div className=' container'>

            <h2>Customers Page</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {/* {ordersList.map(order => (
                <CreateOrderElem order={order}></CreateOrderElem>
            ))} */}

            {customersListPage}

            {/* So elaborate classes, so that the bootstrap matches this pagination implementation */}
            <div className='container d-flex  mt-3 p-2 justify-content-center'>

                <div>
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

        </div>
    );
};



export default ListCustomers;
