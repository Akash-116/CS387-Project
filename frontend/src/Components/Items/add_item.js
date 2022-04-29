import React, { Fragment, useState } from "react";


const AddItem = () => {

    const [curItemName, setCurItemName] = useState()
    const [curItemCost, setCurItemCost] = useState()
    const [curItemUnit, setCurItemUnit] = useState()

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            var itemUpdate = {
                item_name: curItemName,
                cost: curItemCost,
                unit: curItemUnit,
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/items/add", {
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


    return (

        <Fragment>
            <h3>Add a new Item:</h3>


            <form onSubmit={onSubmitForm}>

                <div class="row mb-3">
                    <label for="itemName" class="col-sm-4 col-form-label">Item Name :</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="itemName"
                            value={curItemName}
                            onChange={e => setCurItemName(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="itemCost" class="col-sm-4 col-form-label">Item Cost :</label>
                    <div class="col-sm-6">
                        <input type="number" class="form-control" id="itemCost"
                            value={curItemCost}
                            onChange={e => setCurItemCost(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div class="row mb-3">
                    <label for="itemUnit" class="col-sm-4 col-form-label">Item Unit :</label>
                    <div class="col-sm-6">
                        <input type="text" class="form-control" id="itemUnit"
                            value={curItemUnit}
                            onChange={e => setCurItemUnit(e.target.value)}>
                        </input>
                    </div>
                </div>


                <button type="submit" class="btn btn-primary">Add</button>
            </form>
        </Fragment>

    );
};


export default AddItem;