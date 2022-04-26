import React, { Fragment, useState } from 'react';

const onSubmitForm = async (e) => {

}

const AddOrder = () => {

    const [order, setOrder] = useState({ name: null, description: null, percent: null })

    return (
        <Fragment>





            <form className=" m-5" onSubmit={onSubmitForm}>

                <label>
                    <p>Name</p>
                    <input type="text"
                        className="form-control"
                        value={order.name}
                        onChange={e => order.name = e.target.value}
                    />
                </label>
                <br></br>
                <label>
                    <p>Description</p>
                    <input type="text"
                        className="form-control"
                        value={order.description}
                        onChange={e => order.description = e.target.value}
                    />
                </label>
                <br></br>
                <label>
                    <p>Percent</p>
                    <input type="number"
                        className="form-control"
                        value={order.percent}
                        onChange={e => order.percent = e.target.value}
                    />
                </label>
                <br></br>
                <br></br>
                <button className="btn btn-success">Create</button>
            </form>

        </Fragment>

    );
};



export default AddOrder;
