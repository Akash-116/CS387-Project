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

            <div className='border p-3 m-3 shadow rounded'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h3><b>EID </b> : {emp.e_id} - {emp.name} </h3>
                        <h3><b>username. </b> : {emp.username} </h3>
                        <h3><b>Ph.No. </b> : {emp.ph_no} </h3>
                        <h3><b>Address </b> : {emp.addr} </h3>
                        <h3><b>e_type </b> : {emp.e_type} </h3>
                        <h3><b>salary </b> : {emp.salary} </h3>
                        <h3><b>status </b> : {emp.status} </h3>
                        <button className='btn btn-danger' onClick={onDelete}>
                        Delete
                        </button>

                    </div>
                </div>


            </div>

        </Fragment>
    );
};


const ListEmployees = () => {


    const [employeesList, setEmployeesList] = useState([]);


    const getEmployeesList = async () => {
        // console.log("A");
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/all", {credentials: 'include'})
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setEmployeesList(jsonData.data);
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



export default ListEmployees;
