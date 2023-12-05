import React, { useState } from "react";
import "../Login/Verifyotp.css"
import { FaRegMessage } from "react-icons/fa6";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  useNavigate } from "react-router-dom";
import axios from "axios";


export default function Verifyotp(){
    const navigate=useNavigate();
    const[otp,setOtp]=useState('')
    const otpChange=(e)=>{
        const {value} = e.target;
        setOtp(value);
    }
    const verify=(e)=>{
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/otpverificationAPIView",{otp1:otp}).then((res)=>{
            console.log(res);
        navigate('/resetpassword')
    }).catch((err)=>{
        console.log(err);
    });
    };
    
    return(
        <>
        <form action="">
        <TextField variant="outlined" label="Type otp" onChange={otpChange} /><br />
        <Button variant="contained" startIcon={<FaRegMessage /> } onClick={verify} className="button">
  verify
</Button>
</form>
        </>
    )
}