import React from "react";
import "../Payment/Cod.css"
import { Link } from "react-router-dom";

export default function Cod(){
    return(
        <>
        <div className="mainn">
    <h2 className="cash">Cash On Delivery</h2>
    <form className="codd">
       

        <p className="extra-charge">An extra charge of Rs. 10 will be applied for Cash On Delivery.</p>

        <div className="captcha">
            <label className="captcha" for="captcha">Enter Captcha:</label>
            <img className="photo" src="/creamyhub/static/images/captcha.png" alt="Captcha Image"/>
        </div>

        <label className="captcha" for="captchaInput">Captcha:</label>
        <input className="typpe" type="text" id="captchaInput" name="captchaInput" required/>
        <Link to='/paymentwish' ><button className="bu" type="submit">Pay Now</button></Link>
    </form>
</div>
        </>
    )
}