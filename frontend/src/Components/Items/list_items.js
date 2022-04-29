import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import AddItem from './add_item';

const CreateItemElem = ({ item }) => {

    return (
        <Fragment>

            <div className='border p-3 m-3 shadow rounded'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h3><b>Name </b> : {item.item_id} - {item.item_name} </h3>
                        <h3><b>Cost </b> : {item.cost} </h3>
                        <h3><b>Quantity Left </b> : {item.quan_inv}{item.unit} </h3>
                    </div>
                </div>


            </div>

        </Fragment>
    );
};

const ListItems = () => {


    const [itemlist, setItemlist] = useState([])


    const FetchAllItems = async () => {
        console.log("FetchItems");
        try {

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/items/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setItemlist(jsonData.data);
                console.log(jsonData.data);
            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
                window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    // fetch, everytime rendered
    // Telling to do this effects, everytime the ListTodos is rendered...
    useEffect(() => {
        FetchAllItems();
    }, []);


    /* PAGINATION ELEMENTS */
    const itemsPerPage = 6;

    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * itemsPerPage;

    const itemsListPage = itemlist
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map(item => (
            <CreateItemElem item={item}></CreateItemElem>
        ));

    const pageCount = Math.ceil(itemlist.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    /* PAGINATION ELEMENTS */

    return (
        <div className=' container'>

            <h2>Items Page</h2>

            {/* <AddOffer ordersList={ordersList} setordersList={setordersList} > </AddOffer> */}

            {/* {ordersList.map(order => (
                <CreateOrderElem order={order}></CreateOrderElem>
            ))} */}

            <AddItem></AddItem>

            {itemsListPage}

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



export default ListItems;