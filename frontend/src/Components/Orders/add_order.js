import React, { Fragment, useState, useEffect } from 'react';
import testDishes from '../TestData/testDishes';

const select_area = (area) => {
    return (
        <option value={area.area_id}>{area.loc}, {area.city}</option>
    )
}

const select_offer = (offer) => {
    return (
        <option value={JSON.stringify({ offer_id: offer.offer_id, discount: offer.discount })}>{offer.name} : {offer.discount}% Offer</option>
    )
}

const select_cus = (customer) => {
    return (
        <option value={customer.c_id}>{customer.username}</option>
    )
}

const select_dish = (dish) => {
    return (
        <option value={JSON.stringify({ dish_id: dish.dish_id, dish_name: dish.dish_name, dish_type: dish.dish_type, cost: dish.cost })}>{dish.dish_name} ({dish.dish_type})</option>
    )
}

const select_tbl = (table) => {
    return (
        <option value={JSON.stringify({ table_id: table.table_id, loc: table.loc, status: table.status })}>{table.loc}</option>
    )
}

const select_del = (del) => {
    return (
        <option value={JSON.stringify({ e_id: del.e_id, name: del.username })}>{del.username}</option>
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
    const [freetables, setFreetables] = useState([]);
    const [primdels, setPrimdels] = useState([]);
    const [secdels, setSecdels] = useState([]);
    const [offers, setOffers] = useState([]);
    const [curoffer, setCuroffer] = useState({ offer_id: null, discount: 0 });

    const [curtable, setCurtable] = useState();
    const [curdel, setCurdel] = useState();

    const [offline, setOffline] = useState(true);

    const [cost, setCost] = useState(0);
    const [cost_after_dis, setCost_after_dis] = useState(0);

    const [newid, setNewid] = useState();

    const [add_dish, setAdd_dish] = useState(true);
    const [cantadd, setCantadd] = useState(false);

    const FetchDishes = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/dishes/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setAllDishes(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const FetchAreas = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/areas/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setareas(jsonData.data);
                // console.log(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const FetchDels = async (id) => {
        try {
            console.log(areaid);
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/delivery/free_prim/" + id, { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setPrimdels(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                const response1 = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/delivery/free_sec/" + areaid, { credentials: 'include' });
                const jsonData1 = await response1.json();
                if (jsonData1.success) {
                    setSecdels(jsonData1.data);
                }
                else {
                    console.log(jsonData1.message);
                    alert(jsonData1.message);
                }
            }
        }

        catch (error) {
            console.error(error.message);
        }
    }

    const Fetchfreetables = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/tables/empty", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setFreetables(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
            alert("Error Connecting to Backend");
        }
    }

    const FetchUsers = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setUsers(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const FetchOffers = async () => {
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/offers/all", { credentials: 'include' });
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if (jsonData.success) {
                setOffers(jsonData.data);
            }
            else {
                console.log(jsonData.message);
                alert(jsonData.message + "");
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

    const Add_Order_Dish = async (order_dish) => {
        const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add_order_dish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order_dish),
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
            var order = {
                c_id: cid,
                area_id: areaid,
                order_type: type,
                delivery_person: curdel,
                table_id: curtable,
                offer_id: curoffer
            }
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/orders/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(order),
                credentials: 'include'
            });
            const jsonData = await response.json();
            if (jsonData.success) {
                var order_id = jsonData.data;
                setNewid(order_id);
                // console.log(order_id);
                // console.log(orderDishes);
                orderDishes.forEach(dish => {
                    // console.log(dish.dish_id, dish.dish_name);
                    var order_dish = {
                        dish_id: dish.dish_id,
                        order_id: order_id,
                        quantity: dish.quantity
                    }
                    Add_Order_Dish(order_dish);
                });
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

    const show_selected_dishes = (dish) => {
        return (
            <Fragment>

                <div>Dish : {dish.dish_name}</div>
                <div>Quantity : {dish.quantity}</div>
                <div>Cost : {dish.quantity}*{dish.cost}</div>
            </Fragment>


        )
    }

    function Toggle_add_dish() {
        setAdd_dish(!add_dish);
    }

    const Add_cur_dish = () => {
        console.log(currentdish.dish_id);
        setOrderDishes([...orderDishes, { dish_id: currentdish.dish_id, dish_name: currentdish.dish_name, dish_type: currentdish.dish_type, cost: currentdish.cost, quantity: currentdishquan }]);
        setCost(cost + currentdishquan * currentdish.cost);
        setCost_after_dis(cost_after_dis + currentdish.cost * currentdishquan);
        setCurrentdishquan(null);
        setAdd_dish(true);
    }

    const Apply_Discount = (e) => {
        e.preventDefault();
        setCantadd(true);
        var temp_offer = JSON.parse(e.target.value);
        setCuroffer(temp_offer);
        setCost_after_dis(cost * (1 - 0.01 * temp_offer.discount));
    }

    const UpdateType = (type) => {
        if (type === "Dine") {
            setOffline(true);
            setAreaid(null);
            setCurdel(null);
        }
        else {
            setOffline(false);
            setCurtable(null);
            FetchAreas();

        }
    }

    const SelecArea = async (e) => {
        e.preventDefault();
        setAreaid(e.target.value);
        console.log(areaid);
        FetchDels(e.target.value);
    }

    useEffect(() => {
        FetchUsers();
        FetchDishes();
        FetchOffers();
        Fetchfreetables();
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
                                {users.map(customer => (
                                    select_cus(customer)
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="orderType" class="col-sm-4 col-form-label">Order type :</label>
                        <div class="col-sm-6">
                            <select className='form-select' onChange={e => { e.preventDefault(); UpdateType(e.target.value) }}>
                                <option value="Dine">Dine In</option>
                                <option value="Online">Online</option>
                            </select>
                        </div>
                    </div>
                    {(!offline) &&
                        <div>
                            <div class="row mb-3">
                                <label for="eprimdelarea" class="col-sm-4 col-form-label">Area : </label>
                                <div class="col-sm-6">
                                    <select className='form-select' onChange={e => { SelecArea(e) }}>
                                        <option hidden disabled selected value="none"> -- select an option -- </option>
                                        {areas.map(area => (
                                            select_area(area)
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="eprimdelarea" class="col-sm-4 col-form-label">Delivery Person : </label>
                                <div class="col-sm-6">
                                    <select className='form-select' onChange={e => setCurdel(JSON.parse(e.target.value))}>
                                        <option hidden disabled selected value="none"> -- select an option -- </option>
                                        {(primdels != null && primdels.length > 0) &&
                                            primdels.map(del => (
                                                select_del(del)
                                            ))}
                                        {(primdels === null) &&
                                            secdels.map(del => (
                                                select_del(del)
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    }
                    {(offline) &&
                        <div class="row mb-3">
                            <label for="eprimdelarea" class="col-sm-4 col-form-label">Table : </label>
                            <div class="col-sm-6">
                                <select className='form-select' onChange={e => setCurtable(e.target.value)}>
                                    <option hidden disabled selected value="none"> -- select an option -- </option>
                                    {freetables.map(table => (
                                        select_tbl(table)
                                    ))}
                                </select>
                            </div>
                        </div>
                    }
                    <div class="row mb-3">
                        <label class="col-sm-4 col-form-label">Dishes : </label>
                        <div class="col-sm-6">
                            {orderDishes.map(dish => (
                                show_selected_dishes(dish)
                            ))}
                            {(add_dish && !cantadd) &&
                                <button className='mt-3 btn btn-primary' type="button" onClick={e => Toggle_add_dish()}>Add Dish</button>}
                            {(!add_dish && !cantadd) &&
                                <div>
                                    <label>Dish:</label>
                                    <select className='form-select' onChange={e => setCurrentdish(JSON.parse(e.target.value))}>
                                        <option hidden disabled selected value="none"> -- select an option -- </option>
                                        {allDishes.map(dish => (
                                            select_dish(dish)
                                        ))}
                                    </select>
                                    <label>Quantity</label>
                                    <input type="number" class="form-control" id="dishtimetaken"
                                        value={currentdishquan}
                                        onChange={e => setCurrentdishquan(e.target.value)}></input>
                                    <button className=' mt-4 btn btn-primary' type="button" onClick={e => Add_cur_dish()}>Add</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="eprimdelarea" class="col-sm-4 col-form-label">Offer : </label>
                        <div class="col-sm-6">
                            <select className='form-select' onChange={e => Apply_Discount(e)}>
                                <option hidden disabled selected value="none"> -- select an option -- </option>
                                {offers.map(offer => (
                                    select_offer(offer)
                                ))}
                            </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="dishingredients" class="col-sm-4 col-form-label">Total Cost : </label>
                        <div class="row mb-3 ">
                            <label class="col-sm-4 col-form-label">Total Cost : </label>
                            <div class="col-sm-6">
                                {cost_after_dis}
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Add Order</button>
                </form>
            </div>

        </Fragment>

    );
};



export default AddOrder;
