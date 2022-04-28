/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import { Fragment,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, } from "react-router-dom";

import { useState } from "react";
import './App.css';


import Page1 from "./Components/page1";
import Page2 from "./Components/page2";
import Page3 from "./Components/page3";
import { PageView } from "./Components/pageView";
import Dashboard from "./Components/Dashboard/customer_dashboard";
import Preferences from "./Components/Preferences/Preferences";
import Login from "./Components/Login/Login";
import useToken from "./Components/App/useToken";
import Offers from "./Components/Offers/Offers";
import Analytics from "./Components/analytics";
import ListOrders from "./Components/Orders/list_order";
import AddOrder from "./Components/Orders/add_order";
import AddDish from "./Components/Dishes/add_dish";
import ListDishes from "./Components/Dishes/list_dish";
import AddEmployee from "./Components/Employee/add_employee";
import CustomerHome from "./Components/Customer/home";
import CustomerCart from "./Components/Customer/cart";
import AddCustomer from "./Components/Customer/add_customer";
import SignUp from "./Components/Customer/signup";
import CustomerDetails from "./Components/Customer/details";

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }


function App() {
  // const [token, setToken] = useState()

  // const token = getToken();

  const { token, setToken } = useToken();
  const [sgnup, setsgnup] = useState(false);
  console.log("token is created : ", token);

  const [cart, setCart] = useState({})

  useEffect(() => {
    setsgnup(false);
  }, [])
  
  if (!token && !sgnup) {
    return <Login setToken={setToken} setsgnup={setsgnup}></Login>
  }
  else if(sgnup){
    return <SignUp setsgnup={setsgnup}></SignUp>
  }


  return (
    <Router>
      <div id='wrapper'>

        <nav class="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
          <Link to="/" className="navbar-brand m-4">YARA</Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="collapsibleNavbar">

            {(token.userrole === "customer") &&

              <ul class="navbar-nav">
                <li class="nav-item">
                  <Link to="/home" className="nav-link">Order</Link>
                </li>
                <li class="nav-item">
                  <Link to="/cart" className="nav-link">Cart</Link>
                </li>
                <li class="nav-item">
                  <Link to="/customer/details" className="nav-link">Profile</Link>
                </li>

              </ul>
            }


            {!(token.userrole === "customer") &&

              <ul class="navbar-nav">


                <li class="nav-item">
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                <li class="nav-item">
                  <Link to="/preferences" className="nav-link">Preferences</Link>
                </li>
                <li class="nav-item">
                  <Link to="/offers" className="nav-link">Offers</Link>
                </li>
                <li class="nav-item">
                  <Link to="/analytics" className="nav-link">Analytics</Link>
                </li>
                <li class="nav-item">
                  <Link to="/orders" className="nav-link">Orders</Link>
                </li>
                <li class="nav-item">
                  <Link to="/dishes" className="nav-link">Dishes</Link>
                </li>
                <li class="nav-item">
                  <Link to="/error" className="nav-link">ErrorPg</Link>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    create
                  </a>
                  <div class="dropdown-menu">
                  <Link to="/create/customer" className="dropdown-item">Customer</Link>
                    <Link to="/create/employee" className="dropdown-item">Employee</Link>
                    <Link to="/create/dish" className="dropdown-item">Dish</Link>
                    <Link to="/create/order" className="dropdown-item">Order</Link>
                  </div>
                </li>
              </ul>
            }

            <button className=" btn btn-danger ms-1" onClick={e => { setToken({ token: 'ERROR' }); window.location = '/' }}>Logout</button>
          </div>
        </nav>





        <div class="container-fluid text-center mt-2">
          <p>Hello, Role : {token.data.username}</p>

          {/* <Routes>
            <Route exact path="PV" element={<PageView></PageView>}>
              <Route exact path="page1" element={<Page1></Page1>}></Route>
              <Route exact path="page2" element={<Page2></Page2>}></Route>
              <Route exact path="page3" element={<Page3></Page3>}></Route>
            </Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <h3>There's nothing here!</h3>
                </main>
              }
            />
          </Routes> */}
          <Routes>
            <Route path="/" element={<h3>Welcome to YARA</h3>} ></Route>
            <Route path="/cart" element={<CustomerCart cart={cart} setCart={setCart}></CustomerCart>} ></Route>
            <Route path="/home" element={<CustomerHome cart={cart} setCart={setCart} ></CustomerHome>} ></Route>
            <Route path="/customer/details" element={<CustomerDetails  ></CustomerDetails>} ></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>} ></Route>
            <Route path="/preferences" element={<Preferences></Preferences>} ></Route>
            <Route path="/offers" element={<Offers></Offers>} ></Route>
            <Route path="/analytics" element={<Analytics></Analytics>} ></Route>
            <Route path="/orders" element={<ListOrders></ListOrders>} ></Route>
            <Route path="/dishes" element={<ListDishes></ListDishes>} ></Route>
            <Route path="/create/order" element={<AddOrder></AddOrder>} ></Route>
            <Route path="/create/dish" element={<AddDish></AddDish>} ></Route>
            <Route path="/create/employee" element={<AddEmployee></AddEmployee>} ></Route>
            <Route path="/create/customer" element={<AddCustomer></AddCustomer>}></Route>
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <h3>There's nothing here!</h3>
                </main>
              }
            />
          </Routes>
        </div>
      </div>

      <footer className="bg-light text-center">
        YARA, Yet-Another-Restaurant-App <br />
        Brought to you by <a href="https://www.cse.iitb.ac.in/~akashgillella/" target={"_blank"} rel="noreferrer"> Akash Reddy</a>
        , <a href="https://www.cse.iitb.ac.in/~satwikshadow/" target={"_blank"} rel="noreferrer"> Satwik M</a>, <a href="https://github.com/Thivesh" target={"_blank"} rel="noreferrer"> Thivesh</a>, <a href="https://github.com/bkk2k2" target={"_blank"} rel="noreferrer"> Karthikeya B</a>.
      </footer>

    </Router >
  );
}

export default App;
