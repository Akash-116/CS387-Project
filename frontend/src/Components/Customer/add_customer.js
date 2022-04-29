import React, { Fragment, useState} from 'react';



const AddCustomer = () => {

    // const [selectedImage, setSelectedImage] = useState(null);

    const [username, setusername] = useState(null);
    const [name, setname] = useState(null);
    const [phno, setphno] = useState(null);
    const [pswd, setpswd] = useState(null);
    const [addr, setaddr] = useState(null);
    
    const [newid, setnewid] = useState(null);



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
            var customer={};
            if(phno===""){
                customer={
                    username : username,
                    name : name,
                    pswd : pswd,
                    addr : addr
                }
            }
            else{
                customer={
                    username : username,
                    name : name,
                    pswd : pswd,
                    ph_no : phno,
                    addr : addr
                }
            }
            

            const response = await fetch(process.env.REACT_APP_BACKEND_SERVER + "/customer/create",{
                method : "POST",
                headers : {"Content-Type" : "application/json"},
                body : JSON.stringify(customer),
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


    return (
        <Fragment>
            <div>
                <h2>Add a Customer here</h2>
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
                        <label for="ephno" class="col-sm-3 col-form-label">Ph. No : </label>
                        <div class="col-sm-7">
                            <input type="number" class="form-control" id="ephno"
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
                    <div class="row mb-3">
                        <label for="eaddress" class="col-sm-3 col-form-label">Address : </label>
                        <div class="col-sm-7">
                            <textarea class="form-control" id="eaddress"
                            value={addr}
                            onChange={e=>{setaddr(e.target.value)}}>
                            </textarea>
                        </div>
                    </div>



                    <button type="submit" class="btn btn-primary" disabled={!username || !pswd || username === "" || pswd===""}>Submit</button>
                </form>
            </div>


        </Fragment>
    );
};



export default AddCustomer;
