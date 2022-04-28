import React, { useState } from "react";
import Pagination from "react-js-pagination";



const PaginationComp = ({ }) => {
    const [activePage, setActivePage] = useState(15)

    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber)
    }

    return (
        <div>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
};




export default PaginationComp;