import React, { Fragment } from 'react';



const AddDish = ({ dishesList, setDishesList }) => {

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

            <form className=" m-5 form-horizontal" onSubmit={onSubmitForm}>

                <label>
                    <p>Name</p>
                    <input type="text"
                        className="form-control"
                        value={newDish.dish_name}
                        onChange={e => newDish.dish_name = e.target.value}
                    />
                </label>
                <label>
                    <p>Recipe</p>
                    <input type="text"
                        className="form-control"
                        value={newDish.recipe}
                        onChange={e => newDish.recipe = e.target.value}
                    />
                </label>
                <label>
                    <p>Time Taken (in min)</p>
                    <input type="number"
                        className="form-control"
                        value={newDish.time_taken}
                        onChange={e => newDish.time_taken = e.target.value}
                    />
                </label>
                <label>
                    <p>Time Taken (in min)</p>
                    <input type="number"
                        className="form-control"
                        value={newDish.time_taken}
                        onChange={e => newDish.time_taken = e.target.value}
                    />
                </label>
                <button className="btn btn-success">Add</button>
            </form>


        </Fragment>
    );
};



export default AddDish;
