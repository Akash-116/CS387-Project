import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";



const CreateEmployeeElem = ({ emp }) => {
    const onDelete = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/single", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emp),
                credentials: 'include'
            });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (!jsonData.success) {
                alert(jsonData.message + "");
            }
            window.location.reload();

        } catch (error) {
            console.error(error.message);

        }

    }

    return (
        <Fragment>

            <div className='border container  shadow rounded-15 overflow-hidden mt-3'>
                <div className='row'>
                    <div className='col-sm-3 bg-grey-grad d-flex justify-content-center
                        align-items-center'>

                        <i className='fas fa-id-card fa-6x	'></i>
                    </div>
                    <div className='col-sm-9  pb-3 p-0'>
                        <div className='mt-3 pb-1 ms-3 d-flex flex-column align-items-start '>
                            <div className='d-flex justify-content-between align-self-stretch pe-4'>
                                <h3 className='text-capitalize'>{emp.name} </h3>
                                <button className='btn btn-danger' onClick={onDelete}>
                                    Delete
                                </button>


                            </div>
                            <hr className='align-self-stretch'></hr>
                            <div className='container'>

                                <div className=' row '>
                                    <div className='col-sm-6 d-flex flex-column align-items-start'>

                                        <p className='m-0'><b>Employee ID </b> : {emp.e_id} </p>
                                        <p className='m-0'><b>username </b> : {emp.username} </p>
                                        <p className='m-0'><b>Ph.No. </b> : {emp.ph_no} </p>
                                    </div>
                                    <div className='col-sm-6 d-flex flex-column align-items-start'>
                                        <p className='m-0'><b>Address </b> : {emp.addr} </p>
                                        <p className='m-0'><b>Role </b> : {emp.e_type} </p>
                                        <p className='m-0'><b>salary </b> : {emp.salary} </p>
                                        <p className='m-0'><b>status </b> : {emp.status} </p>

                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                </div>


            </div>




        </Fragment >
    );
};


const ListEmployees = () => {


    const [employeesList, setEmployeesList] = useState([]);


    const getEmployeesList = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/all", { credentials: 'include' })
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setEmployeesList(jsonData.data);
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
        getEmployeesList();
    }, []);


    /* PAGINATION ELEMENTS */
    const employeesPerPage = 6;

    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * employeesPerPage;

    const employeesListPage = employeesList
        .slice(pagesVisited, pagesVisited + employeesPerPage)
        .map(emp => (
            <CreateEmployeeElem emp={emp}></CreateEmployeeElem>
        ));

    const pageCount = Math.ceil(employeesList.length / employeesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    /* PAGINATION ELEMENTS */

    return (
        <div className=' container'>

            <h2>Employees Page</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {/* {ordersList.map(order => (
                <CreateOrderElem order={order}></CreateOrderElem>
            ))} */}

            {employeesListPage}

            {/* So elaborate classes, so that the bootstrap matches this pagination implementation */}
            <div className='container d-flex m-2 justify-content-center'>

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



export default ListEmployees;
