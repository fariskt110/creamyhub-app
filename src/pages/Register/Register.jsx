import React,{useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import "../Register/Register.css"
import toast,{Toaster} from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import axios  from "axios";


export default function Register(){
    const navigate=useNavigate();
    const [register,setRegister]=useState({})

    console.log(register);
    const handleRegisterChange =(e) =>{
      const {name,value} = e.target
      setRegister({ ...register,[name]:value})
    }
    const regadd=(e)=>{
      e.preventDefault()
      axios.post("http://127.0.0.1:8000/api/UserRegistrationAPIView",register).then((res)=>{
            
          console.log(res);
          toast.success("registration done sucessfully");
          setTimeout(() => {
            navigate("/Login") 
          }, 2000);
        }).catch((err)=>{
          console.log(err);
          toast.error("Registration failed sucessfully.")
        })
        console.log(register);
    }


    return(
        <>
        <div><Toaster/></div>
        <div className="centercontainer">
      
        <form className="formm">
    
  <p className="titlee">Register </p>
  <p className="messagee">Signup now and get full access to our app. </p>
  <label>
    <input required="" className="inpuut" type="text" name="Name" placeholder="" onChange={handleRegisterChange} />
    <span>Name</span>
  </label>
  <label>
    <input className="inpuut" type="phone" name="Phoneno" placeholder="" required="" onChange={handleRegisterChange} />
    <span>Phone</span>
  </label>
  <label>
    <input className="inpuut" type="email" name="email" placeholder="" onChange={handleRegisterChange} />
    <span>Email</span>
  </label>
  <label>
    <input className="inpuut" type="password" name="password" placeholder="" onChange={handleRegisterChange} />
    <span>Password</span>
  </label>
  {/* <label>
    <input className="input" type="password" name="password" placeholder="********" onChange={handleRegisterChange} />
    <span>Confirm password</span>
  </label> */}
  <button className="submiit"onClick={regadd} >Submit</button>
  <p className="signin">
    Already have an acount ? <a href="/Login">Signin</a>{" "}
  </p>
</form>
</div>

        </>
    )
}

