import React from "react";
import "../Payment/Gpay.css"


export default function Gpay(){
    return(
        <>
        
       <div className="Gpayy">
    <h2 className="hee">Pay Using UPI</h2>
    <form className="gpay">
        <label className="up" for="upiId">Enter Your UPI ID:</label>
        <input className="inn" type="text" id="upiId" name="upiId" placeholder="example@upi" required/>

        <label className="up" for="bank">Select Your Bank:</label>
        <select className="sel" id="bank" name="bank">
            <option value="okhdfc">OKHDFC</option>
            <option value="okicc">OKICC</option>
            <option value="oksbi">OKSBI</option>
        </select>

        <button className="now" type="submit">Pay Now</button>
    </form>
</div>

 
        </>
    )
}