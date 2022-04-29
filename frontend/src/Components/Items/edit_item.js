import React, { Fragment, useEffect, useState } from "react";

const select_item = (item) => {
    return (
        <option value={JSON.stringify({ item_id: item.item_id, item_name: item.item_name, unit: item.unit, cost: item.cost })}>{item.item_name}</option>
    )
}

const EditItem = () => {

    const [allItems, setAllItems] = useState([])
    const [curItem, setCurItem] = useState({})
    const [curItemCount, setCurItemCount] = useState()
    // const [itemId, setItemId] = useState(-1)


    const FetchAllItems = async () => {
        console.log("FetchAllItems");
        try {

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/items/all",
                { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setAllItems(jsonData.data);
                console.log(jsonData.data);
            }
            else {
                alert(jsonData.message + "");
                console.log(jsonData.message);
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            var itemUpdate = {
                item_id: curItem.item_id,
                quantity: curItemCount
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/items/update_item_bought", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(itemUpdate),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (jsonData.success) {
                alert("Success");
                window.location.reload();
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
            }

        } catch (error) {
            console.error(error.message);
            alert("Error connectin to backend");
        }
    };
    useEffect(() => {
        FetchAllItems();
    }, []);





    return (

        <Fragment>
            <h3>Bought an Item:</h3>


            <form onSubmit={onSubmitForm}>

                <div class="row mb-3">
                    <label for="itemName" class="col-sm-4 col-form-label">Item :</label>
                    <div class="col-sm-6">
                        <select className='form-select' onChange={e => setCurItem(JSON.parse(e.target.value))}>
                            <option hidden disabled selected value="none"> -- select an option -- </option>
                            {allItems.map(item => (
                                select_item(item)
                            ))}
                        </select>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="itemCount" class="col-sm-4 col-form-label">Quantity (in {curItem.unit}) : </label>
                    <div class="col-sm-6">
                        <input type="number" class="form-control" id="itemCount"
                            value={curItemCount}
                            onChange={e => setCurItemCount(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="itemCost" class="col-sm-4 col-form-label">Cost ({curItem.cost} per {curItem.unit}) : </label>
                    <div class="col-sm-6">
                        <input type="number" class="form-control" id="itemCost"
                            value={curItemCount * curItem.cost}
                            disabled
                        // onChange={e => setCurItemCount(e.target.value)}
                        >
                        </input>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary">Confirm</button>
            </form>
        </Fragment>

    );
};


export default EditItem;