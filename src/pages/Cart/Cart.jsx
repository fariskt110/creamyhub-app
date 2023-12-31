import React, { useEffect, useState } from "react";
import "../Cart/Cart.css";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(3);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // const [user, setUser] = useState({});
  // const [Total, setTotal] = useState("");

  const qnty = user.quantity;
  console.log(qnty);

  console.log(user);

  const userid = localStorage.getItem("user_id");
  console.log(userid);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/Get_Single_user/${userid}`)
      .then((response) => {
        setUser(response.data.data);
        console.log(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/ViewcarteviewAPIView/${userid}`)
      .then((response) => {
        console.log(response);
        if ((response.data.data === "non data available")) {
          setCart([]);
        }else{
          setCart(response.data.data);
        }
      });
  }, []);
  console.log(cart);
  // let total=0;
  // useEffect(() => {
  //   total = cart?.reduce((acc, item) => {
  //     const subtotal = item.quantity * item.cakeprice;
  //     setTotal(acc + subtotal);
  //   }, 0);
  // }, [cart]);
  

  // console.log(Total);
  const clearall = (cakeid) => {
    axios
      .delete(`http://127.0.0.1:8000/api/Delete_cartviewAPIView/${cakeid}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editcart = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const updateCart = (id) => {
    const updatedItem = cart.find((item) => item.id === id);
  
    if (updatedItem) {
      axios.put(`http://127.0.0.1:8000/api/Update_cartviewAPIView/${id}`, {
        quantity: updatedItem.quantity,
      });
    }
  };
  

  const total = cart?.reduce((acc, item) => {
    const subtotal = item.quantity * item.cakeprice;
    return acc + subtotal;
  }, 0);
  const courierCharge = total >= 599 ? 0 : 40;
  const netamount = total + courierCharge;
  const gstPercentage = 8;

  const gstAmount = (netamount * gstPercentage) / 100;
  const grandtotal = netamount + gstAmount;
  
  // localStorage.setItem('grandtotal',JSON.stringify(grandtotal))
  // const net=localStorage.getItem("grandtotal");
  // console.log(net);
  // console.log(user.adress);

  console.log(user.Name);

  const orderadd = () => {
    
    const order = {
      userid: userid,
      grandtotal: grandtotal,
      name: user.Name,
      phoneno: user.Phoneno,
      use: user.adress,
      Location: user.location,
      Pincode: user.pincode,
      
      
      
      
      //  cakeid: cart.length > 0 ? cart[0].cakeid : null
    
    };

    axios
      .post("http://127.0.0.1:8000/api/PlaceOrderAPIView", order)
      .then((response) => {
        console.log(response);
        Navigate("/payment");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(cart);
  return (
    <>
      {cart?.length !== 0 ? (
        <>
          <header>
            <h1 className="heed">Shopping Cart</h1>
          </header>
          <main className="maain">
            <div className="caart-containeer">
              <table className="tablle">
                <thead>
                  <tr>
                    <th>CakeID</th>
                    <th>cakeName</th>
                    <th>CakeCategory</th>
                    <th>brand</th>
                    <th>image</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>

                {cart?.map((data) => {
                  const subtotal = data.quantity * data.cakeprice;

                  return (
                    <tbody>
                      <tr>
                        <td>{data.cakeid}</td>
                        <td>{data.cakename}</td>
                        <td>{data.cakecategory}</td>
                        <td>{data.brand}</td>
                        <td><img height={50} width={50} src={`creamyhub/media/${data.image}`}></img></td>
                        <td>{data.cakeprice}</td>
                       
                        <input
                          type="number"
                          name="quantity"
                          Value={data.quantity}
                          min={1}
                          onChange={(e) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === data.id ? { ...item, quantity: parseInt(e.target.value, 10) } : item
      )
    );
  }}
                        />

                        <td>{subtotal}</td>
                        {/* <td>{data.quantity * data.cakeprice}</td> */}
                        <td>
                          <button
                            onClick={() => {
                              clearall(data.id);
                            }}
                          ></button>
                          <FiDelete />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
              <div className="summary">
                <div className="coupon">
                  <input
                    className="couppen"
                    type="text"
                    placeholder="Discount Coupon"
                  />
                  <button className="apply">Apply Coupon</button>
                </div>
                <div className="totals1">
                  <div>
                    <b>Total </b>:<FaRupeeSign /> {total}
                  </div>
                  <div>
                    <b>Courier Charge</b>:<FaRupeeSign /> {courierCharge}
                  </div>
                  <div>
                    <b>Gst Amount</b>: <FaRupeeSign /> {gstAmount}
                  </div>
                  <div>
                    <b>Net Amount </b>: <FaRupeeSign /> {grandtotal}
                  </div>
                </div>
              </div>
              <div className="cartt-actionss">
                <button className="continuee-shoppingg">
                  Continue Shopping
                </button>
                <Link to={`/payment/${grandtotal}`}>
                  <button onClick={orderadd} className="placee-orderr">
                    Place Order
                  </button>
                </Link>
              </div>
            </div>
            <div className="productt-liist">
              <h2>Our Products</h2>
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRODUCT DESCRIPTION</th>
                    <th>PRICE</th>
                    <th>ADD TO CART</th>
                  </tr>
                </thead>
                <tbody>{/* Product list goes here */}</tbody>
              </table>
            </div>
            <div className="cartt-detailss">
              <div className="deliveryy-detailss">
                <label className="labll" htmlFor="deliveryTo">
                  Delivery To:
                </label>
                <input
                  type="text"
                  id="deliveryTo"
                  name="deliveryTo"
                  placeholder="Enter delivery address"
                />
              </div>
              <div className="deliveryy-detailss">
                <label htmlFor="preferredTime">Preferred Time:</label>
                <input
                  type="text"
                  id="preferredTime"
                  name="preferredTime"
                  placeholder="Enter preferred delivery time"
                  className="inputtt"
                />
              </div>
            </div>
          </main>
        </>
      ) : (
        <h1 className="text-center">cart is empty</h1>
      )}
    </>
  );
}
