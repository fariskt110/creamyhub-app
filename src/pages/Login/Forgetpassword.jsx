import React, { useEffect, useState } from "react";
import "../Login/Forgetpassword.css"
import { FaRegMessage } from "react-icons/fa6";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";


export default function Forgetpassword(){
  const navigate=useNavigate();
  const[password,setPassword]=useState('');
  const EmailChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };
  const passwordChange =(e)=>{
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/GetpasswordAPIVIEW",{Email:password}).then((res)=>{
      console.log(res);
      navigate('/verifyotp')
    }).catch((err)=>{
      console.log(err);
    });
  };

  
    return(
        <>
        <form>
        <TextField variant="outlined" label="Email" type="text" onChange={EmailChange} /><br />
         <Button variant="contained" startIcon={<FaRegMessage /> } className="button" onClick={passwordChange} >
  Send Otp
</Button>



</form>
        </>
    )
}

