import React, { useEffect, useState } from "react";
import "../Login/Login.css"
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";



export default function Login(){
  

  
  
  const navigate=useNavigate();
  const[login,setLogin]=useState({})
 

  console.log(login)
  const handleInputChange = (e) =>{
    const{name,value } = e.target 
    setLogin({...login,[name]:value})
  }
  const dataadd=(e)=>{
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/api/LoginAPIVIEW",login).then((response)=>{
     console.log(response.data.data.role);  
     console.log(login);
      
    
     localStorage.setItem('Name',JSON.stringify(response.data.data.Name))
     localStorage.setItem('login_id',JSON.stringify(response.data.data.login_id))
     localStorage.setItem('username',JSON.stringify(response.data.data.username))
     localStorage.setItem('password',JSON.stringify(response.data.data.password))
     localStorage.setItem('role',JSON.stringify(response.data.data.role))
     localStorage.setItem('user_id',JSON.stringify(response.data.data.user_id))

     console.log(response);
     console.log(login);
     if(response.data.data.role === "user") {
      toast.success("User logged in successfully");
      setTimeout(() => {
        
        navigate('/');
      }, 2000);
    } else if(response.data.data.role === "admin") {
      toast.success("Admin logged in successfully");
      setTimeout(() => {
        navigate('/');

      }, 2000);
    }
  }).catch((err) => {
    console.log(err);
    toast.error("Login failed. Please check your credentials.");
  });
}
    return(
        <>
        <div><Toaster/></div>

        
        
      <div className="login-container">
     
  <form  className="login-form">
    <h2>Login</h2>
    <label htmlFor="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Username" onChange={handleInputChange} required="" />
    <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleInputChange}
        required=""
      />
   
    
    <button type="submit"    onClick={dataadd} >
      Login
    </button>
    <Link to='/forgetpassword'> <a href="#" className="forget-password">Forget Password?</a></Link>
  </form>
</div>


</>

    )
    }