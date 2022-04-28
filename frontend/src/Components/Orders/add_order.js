import React, { Fragment, useState,useEffect } from 'react';
import testDishes from '../TestData/testDishes';

const select_area=(area)=>{
    return (
        <option value={area.area_id}>{area.loc}, {area.city}</option>
    )
}

const select_cus=(customer)=>{
    return (
        <option value={customer.c_id}>{customer.username}</option>
    )
}

const select_dish=(dish)=>{
    return (
        <option value={JSON.stringify({dish_id: dish.dish_id,dish_name : dish.dish_name, dish_type : dish.dish_type, cost: dish.cost})}>{dish.dish_name} ({dish.dish_type})</option>
    )
}


const AddOrder = () => {

    const [areaid, setAreaid] = useState();
    const [cid, setCid] = useState();
    const [type, setType] = useState('Dine');
    const [allDishes, setAllDishes] = useState([]);
    const [currentdish, setCurrentdish] = useState();
    const [currentdishquan, setCurrentdishquan] = useState();
    const [orderDishes, setOrderDishes] = useState([]);
    const [areas, setareas] = useState([]);
    const [users, setUsers] = useState([]);

    const [cost, setCost] = useState(0);

    const [newid, setNewid] = useState();

    const [add_dish, setAdd_dish] = useState(true);

    const FetchDishes=async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/dishes/all");
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setAllDishes(jsonData.data);
            }
            else{
                console.log(jsonData.message);
                alert("Something Went Wrong");
                window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const FetchAreas=async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/areas/all");
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setareas(jsonData.data);
            }
            else{
                console.log(jsonData.message);
                alert("Something Went Wrong");
                window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const FetchUsers=async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/all");
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setUsers(jsonData.data);
            }
            else{
                console.log(jsonData.message);
                alert("Something Went Wrong");
                window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const Add_Order_Dish = async(order_dish)=>{
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add_order_dish",{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(order_dish)
        });
        const jsonData = await response.json();
        if(!jsonData.success){
            alert("Something Went Wrong");
            console.log(jsonData.message);
        }

    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            var order={
                c_id : cid,
                area_id : areaid,
                order_type : type
            }
            const response=await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(order)
            });
            const jsonData=await response.json();
            if(jsonData.success){
                var order_id=jsonData.data;
                setNewid(order_id);
                console.log(order_id);
                console.log(orderDishes);
                orderDishes.forEach(dish=>{
                    console.log(dish.dish_id,dish.dish_name);
                    var order_dish={
                        dish_id : dish.dish_id,
                        order_id : order_id,
                        quantity : dish.quantity
                    }
                    Add_Order_Dish(order_dish);
                });
                alert("Success");
            }
            else{
                console.log(jsonData.message);
                alert("Something Went Wrong");  
            }
            window.location.reload();

        } catch (error) {
            console.error(error.message);
            alert("Error connectin to backend");
        }
    };

    const show_selected_dishes=(dish)=>{
        return(
            <Fragment>

            <div>Dish : {dish.dish_name}</div>
            <div>Quantity : {dish.quantity}</div>
            <div>Cost : {dish.quantity}*{dish.cost}</div>
            </Fragment>
            

        )
    }

    function Toggle_add_dish(){
        setAdd_dish(!add_dish);
    }

    const Add_cur_dish=()=>{
        console.log(currentdish.dish_id);
        setOrderDishes([...orderDishes,{dish_id : currentdish.dish_id,dish_name : currentdish.dish_name,dish_type: currentdish.dish_type,cost : currentdish.cost,quantity : currentdishquan}]);
        setCost(cost+currentdishquan*currentdish.cost);
        setCurrentdishquan(null);
        setAdd_dish(true);
    }

    useEffect(() => {
        FetchAreas();
        FetchUsers();
        FetchDishes();
    }, [])


    return (
        <Fragment>


            <div className='container mt-5'>

                <form onSubmit={onSubmitForm}>
                    <div class="row mb-3">
                        <label for="customerName" class="col-sm-4 col-form-label">Customer :</label>
                        <div class="col-sm-6">
                            <select className='form-select' onChange={e => setCid(e.target.value)}>
                                <option hidden disabled selected value="none"> -- select an option -- </option>
                                {users.map(customer=>(
                                        select_cus(customer)
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="orderType" class="col-sm-4 col-form-label">Order type :</label>
                        <div class="col-sm-6">
                        <select className='form-select' onChange={e => setType(e.target.value)}>
                            <option value="Dine">Dine In</option>
                            <option value="Online">Online</option>
                        </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="eprimdelarea" class="col-sm-4 col-form-label">Area : </label>
                        <div class="col-sm-6">
                        <select className='form-select' onChange={e => setAreaid(e.target.value)}>
                            <option hidden disabled selected value="none"> -- select an option -- </option>
                            {areas.map(area=>(
                                    select_area(area)
                            ))}
                        </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="dishingredients" class="col-sm-4 col-form-label">Dishes : </label>
                        <div class="col-sm-6">
                            {orderDishes.map(dish=>(
                                show_selected_dishes(dish)
                            ))}
                            {(add_dish) &&
                            <button type="button" onClick={e=>Toggle_add_dish()}>Add Dish</button>}
                            {(!add_dish)&&
                            <div>
                                <label>Dish:</label>
                                <select className='form-select' onChange={e => setCurrentdish(JSON.parse(e.target.value))}>
                                    <option hidden disabled selected value="none"> -- select an option -- </option>
                                    {allDishes.map(dish=>(
                                            select_dish(dish)
                                    ))}
                                </select>
                                <label>Quantity</label>
                                <input type="number" class="form-control" id="dishtimetaken"
                                value={currentdishquan}
                                onChange={e=>setCurrentdishquan(e.target.value)}></input>
                                <button type="button" onClick={e=>Add_cur_dish()}>Add</button>
                            </div>
                            }
                        </div>
                    </div>
                    <div class="row mb-3">
                    <label for="dishingredients" class="col-sm-4 col-form-label">Total Cost : </label>
                        <div class="col-sm-6">
                            {cost}
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Order</button>
                </form>
            </div>

        </Fragment>

    );
};



export default AddOrder;
