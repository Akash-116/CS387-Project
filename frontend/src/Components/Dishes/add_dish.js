import React, { Fragment, useState } from 'react';



const AddDish = ({ dishesList, setDishesList }) => {

    const [selectedImage, setSelectedImage] = useState(null);

    let newDish = {
        dish_name: null,
        recipe: null,
        time_taken: null,
        dish_type: null,
        cost: null,
        rating: null,
        photo: null,
    };


    const onSubmitForm = async (e) => {
        // const onSubmitForm = (e) => {
        e.preventDefault();
        try {
            // console.log("need to add :", newDish);
            // console.log("type of offerList :", typeof (offersList));
            // console.log("offersList : ", offersList);
            // console.log("type of setOffersList :", typeof (setOffersList));
            setDishesList(prevState => [...prevState, newDish])
            // offersList.push(newDish);
            // console.log("offersList : ", offersList);

        } catch (error) {
            console.error(error.message);
        }

        // window.location = "/"; // This is to reload website?

    };


    return (
        <Fragment>
            <div>
                <h2>Add a dish here</h2>
            </div>

            <div className='container border pt-5 pb-5'>
                <form>

                    <div class="row mb-3">
                        <label for="dishname" class="col-sm-3 col-form-label">Name : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="dishname">
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishingredients" class="col-sm-3 col-form-label">Ingredients : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="dishingredients">
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishrecipe" class="col-sm-3 col-form-label">Recipe : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="dishrecipe">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="dishtype" class="col-sm-3 col-form-label">Type : </label>
                        <div class="col-sm-7">
                            <select class="form-control" id="dishtype">
                                <option hidden disabled selected> -- select an option -- </option>
                                <option value={"Veg Starter"} >Veg Starter</option>
                                <option value={"Non-Veg Starter"} >Non-Veg Starter</option>
                                <option value={"Veg Main"} >Veg Main</option>
                                <option value={"Non-Veg Main"} >Non-Veg Main</option>
                            </select>

                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishtimetaken" class="col-sm-3 col-form-label">Time Taken : </label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control" id="dishtimetaken">
                            </input>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <label for="dishimage" class="col-sm-3 col-form-label">Image : </label>
                        <div class="col-sm-7">
                            <input type="file" alt='upload image for dish' class="form-control"
                                onChange={e => setSelectedImage(e.target.files[0])} id="dishimage">
                            </input>
                        </div>
                    </div>
                    {selectedImage && (
                        <div className='container m-5'>
                            <img className='img-thumbnail' alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                        </div>
                    )}

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>


        </Fragment>
    );
};



export default AddDish;
