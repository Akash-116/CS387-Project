import React, { Fragment, useState } from 'react';
import testDishes from '../TestData/testDishes';

const onSubmitForm = async (e) => {

}


const AddOrder = () => {

    const [order, setOrder] = useState({ name: null, description: null, percent: null })
    const [allDishes, setAllDishes] = useState(testDishes)

    const [orderDishes, setOrderDishes] = useState([])


    return (
        <Fragment>


            <div className='container mt-5'>

                <form>
                    <div class="row mb-3">
                        <label for="customerName" class="col-sm-4 col-form-label">Customer :</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="customerName">
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="orderType" class="col-sm-4 col-form-label">Order type :</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="orderType">
                            </input>
                        </div>
                    </div>
                    <fieldset class="row mb-3">
                        <legend class="col-form-label col-sm-4 pt-0">Radios</legend>
                        <div class="col-sm-6">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                                </input>
                                <label class="form-check-label" for="gridRadios1">
                                    First radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                                </input>
                                <label class="form-check-label" for="gridRadios2">
                                    Second radio
                                </label>
                            </div>
                            <div class="form-check disabled">
                                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
                                </input>
                                <label class="form-check-label" for="gridRadios3">
                                    Third disabled radio
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div class="row mb-4">
                        <div class="col-sm-6 offset-sm-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck1">
                                </input>
                                <label class="form-check-label" for="gridCheck1">
                                    Example checkbox
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            </div>

        </Fragment>

    );
};



export default AddOrder;
