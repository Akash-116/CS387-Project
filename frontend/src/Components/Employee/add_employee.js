import React, { Fragment, useState,useEffect } from 'react';



const select_area=(area)=>{
    return (
        <option value={area.area_id}>{area.loc}, {area.city}</option>
    )
}


const AddEmployee = () => {

    // const [selectedImage, setSelectedImage] = useState(null);

    const [username, setusername] = useState(null);
    const [name, setname] = useState(null);
    const [role, setrole] = useState(null)
    const [phno, setphno] = useState(null);
    const [pswd, setpswd] = useState(null);
    const [primareaid, setprimareaid] = useState(null);
    const [secareaid, setsecareaid] = useState(null);
    const [addr, setaddr] = useState(null);
    
    const [newid, setnewid] = useState(null);
    const [areas, setareas] = useState([]);



    // let newDish = {
    //     dish_name: null,
    //     recipe: null,
    //     time_taken: null,
    //     dish_type: null,
    //     cost: null,
    //     rating: null,
    //     photo: null,
    // };

    const FetchAreas=async ()=>{
        try {
            // console.log(process.env.REACT_APP_BACKEND_SERVER)
            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/areas/all", {credentials: 'include'});
            // Here, fetch defualt is GET. So, no further input
            const jsonData = await response.json();
            if(jsonData.success){
                setareas(jsonData.data);
            }
            else{
                alert(jsonData.message+"");
                console.log(jsonData.message);
                // window.location.reload();
            }

        } catch (error) {
            console.error(error.message);
        }
    }

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
            var employee={
                username : username,
                name : name,
                pswd : pswd,
                ph_no : phno,
                e_type : role,
                addr : addr,
                prim_area_id : primareaid,
                sec_area_id : secareaid
            }

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/employee/create",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(employee),
                credentials: 'include'
            });
            
            const jsonData = await response.json();
            if(jsonData.success){
                setnewid(jsonData.data);
                alert("Success");
            }
            else{
                alert(jsonData.message+"");
                console.log(jsonData.message);
            }
            window.location.reload();

        } catch (error) {
            console.error(error.message);
        }

        // window.location = "/"; // This is to reload website?

    };

    useEffect(() => {
        FetchAreas();
    }, [])

    
    


    return (
        <Fragment>
            <div>
                <h2>Add a Employee here</h2>
            </div>

            <div className='container border pt-5 pb-5'>
                <form onSubmit={onSubmitForm}>

                    <div class="row mb-3">
                        <label for="eusername" class="col-sm-3 col-form-label">Username : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="eusername"
                            value={username}
                            onChange={e=>setusername(e.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ename" class="col-sm-3 col-form-label">Name : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="ename"
                            value={name}
                            onChange={e=>{setname(e.target.value)}}>
                            </input>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="erole" class="col-sm-3 col-form-label">Role : </label>
                        <div class="col-sm-7">
                        <select className='form-select' onChange={e => setrole(e.target.value)}>
                            <option hidden disabled selected value="none"> -- select an option -- </option>
                            <option value="Chef">Chef</option>
                            <option value="Manager">Manager</option>
                            <option value="Delivery">Delivery Person</option>
                            <option value="Head Waiter" >Head Waiter</option>
                        </select>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="ephno" class="col-sm-3 col-form-label">Ph. No : </label>
                        <div class="col-sm-7">
                            <input type="tel" class="form-control" id="ephno"
                            value={phno}
                            onChange={e=>setphno(e.target.value)}>
                            </input>
                        </div>
                    </div>


                    <div class="row mb-3">
                        <label for="epwd" class="col-sm-3 col-form-label">Password : </label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="epwd"
                            value={pswd}
                            onChange={e=>{setpswd(e.target.value)}}>
                            </input>
                        </div>
                    </div>
                    {(role==="Delivery") &&
                        <div>
                            <div class="row mb-3">
                                <label for="eprimdelarea" class="col-sm-3 col-form-label">Primary Delivery Area : </label>
                                <div class="col-sm-7">
                                <select className='form-select' onChange={e => setprimareaid(e.target.value)}>
                                    <option hidden disabled selected value="none"> -- select an option -- </option>
                                    {areas.map(area=>(
                                         select_area(area)
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="esecdelarea" class="col-sm-3 col-form-label">Secondary Delivery Area : </label>
                                <div class="col-sm-7">
                                <select className='form-select' onChange={e => setsecareaid(e.target.value)}>
                                    <option hidden disabled selected value="none"> -- select an option -- </option>
                                    {areas.map(area=>(
                                         select_area(area)
                                    ))}
                                </select>
                                </div>
                            </div>
                        </div>
                    }

                    <div class="row mb-3">
                        <label for="eaddress" class="col-sm-3 col-form-label">Address : </label>
                        <div class="col-sm-7">
                            <textarea class="form-control" id="eaddress"
                            value={addr}
                            onChange={e=>{setaddr(e.target.value)}}>
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
