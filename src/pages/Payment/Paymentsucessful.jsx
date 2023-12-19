import React, { useEffect, useState } from "react";
import "../Payment/Paymentsucessful.css"
import axios from "axios";

export default function Paymentsucessful(){
    const [cart,setCart]=useState([]);
    const userid=localStorage.getItem("user_id");
    console.log(userid);
    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/view_orderAPIView/${userid}`).then((response=>{
         setCart(response.data.data)
         console.log(response.data.data);
        }));
     },[]);
    setTimeout(function() {
        document.getElementById('curtain-container').classList.add('curtain-open');
        setTimeout(function() {
            document.getElementById('curtain-container').classList.add('truck-move');
        }, 1000); // Adjust the delay as needed
        setTimeout(function() {
            document.getElementById('success-message').style.opacity = 1;
        }, 3000); // Adjust the delay as needed
    }, 2000); // Adjust the delay as needed
    return(
        <>
      <div id="curtain-container">
    <div id="curtain"></div>
    <div id="truck"></div>
</div>
{cart.map((data)=>(
<div id="success-message">
    <h1>Payment Successful</h1>
    <p>Payment ID: <span id="payment-id">{data.id}</span></p>
</div>
))}


        </>
    )
}