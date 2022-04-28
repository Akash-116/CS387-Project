import React, { useState } from 'react';


const CustomerDetails = () => {

    const [cUsername, setCUsername] = useState()
    const [cName, setCName] = useState()
    const [cPhNo, setCPhNo] = useState()
    const [cAddress, setCAddress] = useState()
    const [cNumDish, setCNumDish] = useState(15)
    const [cNumOrder, setCNumOrder] = useState(25)
    const [editDetails, setEditDetails] = useState(false)

    return (

        <div className='container'>
            <div className='border rounded shadow m-5 p-3 container'>
                <h2>Customer Details : </h2>
                <hr></hr>
                <div className='container'>
                    <form>
                        <div class="row mb-3">
                            <label for="cusername" class="col-sm-3 col-form-label">Username</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="cusername"
                                    value={cUsername} onChange={e => setCUsername(e.target.value)}
                                    disabled={!editDetails}>
                                </input>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cname" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="cname"
                                    value={cName} onChange={e => setCName(e.target.value)}
                                    disabled={!editDetails}>
                                </input>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cphno" class="col-sm-3 col-form-label">Ph No.</label>
                            <div class="col-sm-9">
                                <input type="tel" class="form-control" id="cphno"
                                    value={cPhNo} onChange={e => setCPhNo(e.target.value)}
                                    disabled={!editDetails}>
                                </input>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="caddress" class="col-sm-3 col-form-label">Address</label>
                            <div class="col-sm-9">
                                <textarea class="form-control" id="caddress"
                                    value={cAddress} onChange={e => setCAddress(e.target.value)}
                                    disabled={!editDetails}>

                                </textarea>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cnumorder" class="col-sm-3 col-form-label">No. of Orders</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="cnumorder"
                                    value={cNumOrder}
                                    disabled>
                                </input>
                            </div>

                        </div>
                        <div class="row mb-3">
                            <label for="cnumdish" class="col-sm-3 col-form-label">No. of Dishes</label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control" id="cnumdish"
                                    value={cNumDish}
                                    disabled>
                                </input>
                            </div>
                        </div>
                        {/* <button type="submit" class="btn btn-primary">Submit</button> */}

                        <button disabled={editDetails} class="btn btn-primary m-3" onClick={e => { e.preventDefault(); setEditDetails(true) }} >Edit</button>
                        <button disabled={!editDetails} class="btn btn-primary m-3" onClick={e => { e.preventDefault(); setEditDetails(false) }} >Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


export default CustomerDetails;
