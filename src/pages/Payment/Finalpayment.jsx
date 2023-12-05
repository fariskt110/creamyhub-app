import React, { useContext } from "react";
import "../Payment/Finalpayment.css"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { userContext } from "../../Context/Context";



export default function Finalpayment(){
    const {grandtotal}=useParams();
    const {Context,setContext}=useContext(userContext)
    console.log(Context);
    
     
               {/* <img src="/creamyhub/static/images/QR/upi_qr.png" alt="" /> */}
  

  return (
    <>

      
      <div className="full">
  <div className="qr-code-section">
    <img src="/creamyhub/static/images/QR/upi_qr.png" alt="" />
  </div>

  <div className="payment-options">
    <h2 className="recommended-heading">Payment options</h2>
   <Link  to={'/gpay'}> <button className="payment-option">
      <img src="/creamyhub/static/images/gpayph.jpeg" alt="GPay/PhonePay" />
      <span>GPay/PhonePay</span>
    </button></Link>

   <Link to={'/cod'}> <button className="payment-option">
      <img src="/creamyhub/static/images/cod.png" alt="COD" />
      <span>COD</span>
    </button></Link>

    <Link to={'/card'}><button className="payment-option">
      <img src="/creamyhub/static/images/c.png" alt="Card" />
      <span>Credit Card</span>
    </button></Link>
  </div>

  <div className="price-details">
    <h2>Total Amount</h2>
    <div className="total-box">RS {grandtotal}</div>
  </div>
</div>

    </>
  );
}

  