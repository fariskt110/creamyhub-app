import React, { useEffect, useState } from "react";
import "../Payment/Cod.css"
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";




export default function Cod() {
  const userid = localStorage.getItem("user_id");
  const { grandtotal } = useParams();
  const navigate = useNavigate();

  const pay = () => {
    const payy = {
      grandtotal: grandtotal,
      userid: userid,
    };

    axios.post("http://127.0.0.1:8000/api/paymentAPIView", payy)
      .then((response) => {
        console.log("Payment success");
        console.log(response);
        navigate("/paymentwish"); // Navigate to the paymentwish page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mainn">
        <h2 className="cash">Cash On Delivery</h2>
        <form className="codd">
          <p className="extra-charge">
            An extra charge of Rs. 10 will be applied for Cash On Delivery.
          </p>

          <div className="captcha">
            <label className="captcha" htmlFor="captcha">
              Enter Captcha:
            </label>
            <img
              className="photo"
              src="/creamyhub/static/images/captcha.png"
              alt="Captcha Image"
            />
          </div>

          <label className="captcha" htmlFor="captchaInput">
            Captcha:
          </label>
          <input
            className="typpe"
            type="text"
            id="captchaInput"
            name="captchaInput"
            required
          />
          <button className="bu" type="button" onClick={pay}>
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
}