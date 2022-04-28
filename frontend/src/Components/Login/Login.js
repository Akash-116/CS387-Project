import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import PropTypes from "prop-types";
import './Login.css';
import SignUp from "../Customer/signup";




async function loginUser(credentials) {
  // console.log("Credentials stringfy : ", JSON.stringify(credentials));
  console.log(credentials.role);
  if (credentials.role === "customer") {
    console.log("if");
    return fetch(process.env.REACT_APP_BACKEND_SERVER + '/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials),
      credentials: 'include'
    })
      .then(data => {
        console.log("data TYPE is : ", typeof (data));
        console.log("data is : ", data);
        return data.json();
      });
  }
  else {
    console.log("else");
    return fetch(process.env.REACT_APP_BACKEND_SERVER + '/employee/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => {
        console.log("data TYPE is : ", typeof (data));
        console.log("data is : ", data);
        return data.json();
      })
  }


}

export default function Login({ setToken, setsgnup }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userRole, setUserRole] = useState("none");
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    var token = await loginUser({
      username: username,
      pswd: password,
      role: userRole
    });
    token.userrole = userRole;
    let ermg = setToken(token);
    setErrorMsg(ermg);
    // console.log("token is : ", token)
  }

  // const MakeSignupTrue=()=>{
  //   setsgnup(true);
  // }




  return (
    <div className="login-wrapper mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input className='form-control' type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          <p>Password</p>
          <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          <p>Role</p>
          <select className='form-select' onChange={e => setUserRole(e.target.value)}>
            <option hidden disabled selected value="none"> -- select an option -- </option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <br />
        <label>
          <p className='text-danger' >{errorMsg}</p>
        </label>
        <br />
        <div>
          <button className='btn btn-primary' type="submit" disabled={username === "" || password === "" || userRole === "none"} >Submit</button>
        </div>
      </form>


      <div>
        Didn't have a Customer account?
        <button className='btn btn-primary' onClick={e => setsgnup(true)} >signup</button>
        {/* <button className='btn btn-primary' onClick={e => console.log("Clicked")} >signup</button> */}
      </div>


      {/* <Router>
        <div>Didn't have a Customer account?<Link to="/signup">signup</Link></div>
        <Routes>
          <Route path="/signup" element={<SignUp setsgnup={setsgnup}></SignUp>}></Route>
        </Routes>
      </Router> */}
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}