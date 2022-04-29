import React, { Fragment, useState, useEffect } from 'react';


const select_item = (item) => {
    return (
        <option value={JSON.stringify({ item_id: item.item_id, item_name: item.item_name, unit: item.unit })}>{item.item_name}</option>
    )
}

const AddDish = ({ dishesList, setDishesList }) => {

    // const [selectedImage, setSelectedImage] = useState(null);
    const [dishname, setDishname] = useState(null);
    const [recipe, setRecipe] = useState("");
    const [timetaken, setTimetaken] = useState(null);
    const [dishtype, setDishtype] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [cost, setCost] = useState(null);
    const [items, setItems] = useState([]);
    const [totalitems, setTotalitems] = useState([]);
    const [currentitem, setCurrentitem] = useState({ item_id: null, item_name: '', unit: '' });
    const [currentitemquan, setCurrentitemquan] = useState(null);

    const [newid, setNewid] = useState(null);

    const [add_item, setAdd_item] = useState(true)

    const FetchAllItems = async () => {
        console.log("FetchItems");
        try {

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/items/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setTotalitems(jsonData.data);
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


    const Add_Dish_item = async (dish_item) => {
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/dishes/add_item", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dish_item),
            credentials: 'include'
        });
        const jsonData = await response.json();
        if (!jsonData.success) {
            alert(jsonData.message + "");
            console.log(jsonData.message);
        }

    }


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            var dish = {
                dish_name: dishname,
                recipe: recipe,
                time_taken: timetaken,
                dish_type: dishtype,
                cost: cost,
                photo: photo
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/dishes/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dish),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (jsonData.success) {
                var dish_id = jsonData.data;
                setNewid(dish_id);
                console.log(items);
                items.forEach(item => {
                    console.log(item.item_name, item.item_id);
                    var dish_item = {
                        dish_id: dish_id,
                        item_id: item.item_id,
                        quantity: item.quantity
                    }
                    Add_Dish_item(dish_item);
                });
                alert("Success");
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
            }
            window.location.reload();

        } catch (error) {
            console.error(error.message);
            alert("Error connectin to backend");
        }
    };

    const show_selected_items = (item) => {
        return (
            <Fragment>

                <div>Item : {item.item_name}</div>
                <div>Quantity : {item.quantity}{item.unit}</div>
            </Fragment>


        )
    }

    function Toggle_add_item() {
        setAdd_item(!add_item);
    }

    const Add_cur_item = () => {
        console.log(currentitem.item_id);
        setItems([...items, { item_id: currentitem.item_id, item_name: currentitem.item_name, unit: currentitem.unit, quantity: currentitemquan }]);
        setCurrentitemquan(null);
        setAdd_item(true);
    }

    useEffect(() => {
        FetchAllItems();
    }, []);


    return (
        <Fragment>
            <div>
                <h2>Add a dish here</h2>
            </div>

            <div className='container border pt-5 pb-5'>
                <form onSubmit={onSubmitForm}>

                    <div class="row mb-3">
                        <label for="dishname" class="col-sm-3 col-form-label">Name : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="dishname"
                                value={dishname}
                                onChange={e => setDishname(e.target.value)}>
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishingredients" class="col-sm-3 col-form-label">Ingredients : </label>
                        <div class="col-sm-7">
                            {items.map(item => (
                                show_selected_items(item)
                            ))}
                            {(add_item) &&
                                <button className='mt-4 btn btn-primary' type="button" onClick={e => Toggle_add_item()}>Add Item</button>}
                            {(!add_item) &&
                                <div>
                                    <label>Item:</label>
                                    <select className='form-select' onChange={e => setCurrentitem(JSON.parse(e.target.value))}>
                                        <option hidden disabled selected value="none"> -- select an option -- </option>
                                        {totalitems.map(item => (
                                            select_item(item)
                                        ))}
                                    </select>
                                    <label>Quantity</label>
                                    <input type="number" class="form-control" id="dishtimetaken"
                                        value={currentitemquan}
                                        onChange={e => setCurrentitemquan(e.target.value)}></input>
                                    <button className='btn btn-primary mt-4' type="button" onClick={e => Add_cur_item()}>Add</button>
                                </div>
                            }
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishrecipe" class="col-sm-3 col-form-label">Recipe : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="dishrecipe"
                                value={recipe}
                                onChange={e => setRecipe(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="dishtype" class="col-sm-3 col-form-label">Type : </label>
                        <div class="col-sm-7">
                            <select class="form-control" id="dishtype" onChange={e => setDishtype(e.target.value)}>
                                <option hidden disabled selected> -- select an option -- </option>
                                <option value={"Deserts"} >Desert</option>
                                <option value={"Veg Starter"} >Veg Starter</option>
                                <option value={"Non-Veg Starter"} >Non-Veg Starter</option>
                                <option value={"Veg Main"} >Veg Main</option>
                                <option value={"Non-Veg Main"} >Non-Veg Main</option>
                            </select>

                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishtimetaken" class="col-sm-3 col-form-label">Time Taken (in mins) : </label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control" id="dishtimetaken"
                                value={timetaken}
                                onChange={e => setTimetaken(e.target.value)}>
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishtimetaken" class="col-sm-3 col-form-label">Cost : </label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control" id="dishtimetaken"
                                value={cost}
                                onChange={e => setCost(e.target.value)}>
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishimage" class="col-sm-3 col-form-label">Image URL : </label>
                        <div class="col-sm-7">
                            {/* <input type="file" alt='upload image for dish' class="form-control"
                                onChange={e => setSelectedImage(e.target.files[0])} id="dishimage">
                            </input> */}
                            <input type="text" class="form-control"
                                value={photo}
                                onChange={e => setPhoto(e.target.value)} id="dishimage">
                            </input>
                        </div>
                    </div>
                    {/* {selectedImage && (
                        <div className='container m-5'>
                            <img className='img-thumbnail' alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )} */}

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>


        </Fragment>
    );
};



export default AddDish;
