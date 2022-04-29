import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import AddItem from './add_item';

const CreateItemElem = ({ item }) => {

    return (
        <Fragment>
            <div className='border   mt-3 shadow rounded-15 overflow-hidden'>
                <div className='row'>
                    <div className='col-sm-3 bg-yellow-grad d-flex justify-content-center
                 align-items-center'>

                        <i className='fa fa-3x fa-pepper-hot'></i>
                    </div>
                    <div className='col-sm-7 '>
                        <div className='mt-3 pb-1 ms-3 d-flex flex-column align-items-start'>

                            <h5 className='text-capitalize'>  {item.item_id}. {item.item_name} </h5>
                            <p><b>Cost </b> : {item.cost} </p>
                            <p><b>Quantity Left </b> : {item.quan_inv}{item.unit} </p>
                        </div>


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
            <div className='container d-flex   p-2 justify-content-center'>

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