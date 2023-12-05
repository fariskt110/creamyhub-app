import React from "react";
import "../Payment/Paymentsucessful.css"

export default function Paymentsucessful(){
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

<div id="success-message">
    <h1>Payment Successful</h1>
    <p>Payment ID: <span id="payment-id">123456789</span></p>
</div>


        </>
    )
}