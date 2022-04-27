import React, { Fragment, useState } from 'react';



const AddEmployee = () => {

    // const [selectedImage, setSelectedImage] = useState(null);

    // let newDish = {
    //     dish_name: null,
    //     recipe: null,
    //     time_taken: null,
    //     dish_type: null,
    //     cost: null,
    //     rating: null,
    //     photo: null,
    // };


    const onSubmitForm = async (e) => {
        // const onSubmitForm = (e) => {
        e.preventDefault();
        try {
            // console.log("need to add :", newDish);
            // console.log("type of offerList :", typeof (offersList));
            // console.log("offersList : ", offersList);
            // console.log("type of setOffersList :", typeof (setOffersList));
            // setDishesList(prevState => [...prevState, newDish])
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
                <h2>Add a Employee here</h2>
            </div>

            <div className='container border pt-5 pb-5'>
                <form>

                    <div class="row mb-3">
                        <label for="eusername" class="col-sm-3 col-form-label">Username : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="eusername">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ename" class="col-sm-3 col-form-label">Name : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="ename">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="erole" class="col-sm-3 col-form-label">Role : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="erole">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ephno" class="col-sm-3 col-form-label">Ph. No : </label>
                        <div class="col-sm-7">
                            <input type="tel" class="form-control" id="ephno">
                            </input>
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="epwd" class="col-sm-3 col-form-label">Password : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="epwd">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="eprimdelarea" class="col-sm-3 col-form-label">Primary Delivery Area : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="eprimdelarea">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="esecdelarea" class="col-sm-3 col-form-label">Secondary Delivery Area : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="esecdelarea">
                            </input>
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="eaddress" class="col-sm-3 col-form-label">Address : </label>
                        <div class="col-sm-7">
                            <textarea class="form-control" id="eaddress">
                            </textarea>
                        </div>
                    </div>



                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>


        </Fragment>
    );
};



export default AddEmployee;
