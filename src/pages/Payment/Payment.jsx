import React, { useEffect, useState } from "react";
import "../Payment/Payment.css"
import { FaRupeeSign } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Payment(){
    const [cart,setCart]=useState([]);
    const [use,setUser]=useState([]);
    const {grandtotal} =useParams()
    const amd = {grandtotal}
    const aas = amd.grandtotal

    const user=localStorage.getItem("user_id");
    console.log(user);

    useEffect(()=>{
   axios.get(`http://127.0.0.1:8000/api/VieworderAPIView/${user}`).then((response=>{
     console.log(response.data.data);
    setCart(response.data.data)
   }));
},[]);
useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/api/Get_Single_user/${user}`).then((response=>{
  setUser(response.data.data);
  console.log(response.data.data);
  }));
},[]);

const navigate=useNavigate();

const ssss =()=>{
  const data = {
    grandtotal:aas
  }
 
axios.post("http://127.0.0.1:8000/api/generateqr_api", data).then((response)=>{
  console.log(response);
})
}




console.log(cart);
    return(
        <>
      <div className="payyment">
    {/* <!-- Product Details and Totals --> */}
    <div className="prroduct-details">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>Productname</th>
            
            <th>Productimage</th>
            
          </tr>
        </thead>
        
        {cart.map((data)=>(
  <tbody>
    <tr>
      <td>{data.cakeid}</td>
      <td>{data.cakename}</td>
      
      
      <td>{`/creamyhub/static/${data.image}`}</td>
    </tr>
    {/* <!-- Add more rows for other products if needed --> */}
  </tbody>
  ))}
      </table>

      <div className="tota">
        
        <div><b>Grand Total:</b> <FaRupeeSign/> {grandtotal}</div>
      </div>
    </div>

    {/* <!-- Delivery Address --> */}
    <div className="deliveraddress">
      <h2>Delivery Details</h2>
      <section className="product-section">
         <div className="product-card">
         {/* <img  src={`/creamyhub/static/${data.image}`} alt="Cake 1" /> */}
         <div className="product-card-content">
        <h3>{use.Name}</h3>
        <p>{use.Phoneno}</p>
        <p>{use.email}</p>
        <p>{use.adress}</p>
        <p>{use.location}</p>
        <p>{use.pincode}</p>
        {/* <Link to={`/userupdate/${use.id}`}><button>Edit</button></Link> */}
        {/* <button onClick={()=>{clearall(data.id)}} >Delete</button> */}
       {/* <Link to={`/admin-update/${data.id}`}><button>Edit</button></Link> */}

      </div>
    </div>
    </section>
    </div>
  </div>

  <div className="payment-section">
    <h2 className="text-center" >Payment Options</h2>
    {/* <!-- Payment method radio buttons go here --> */}
  <Link  to={`/finalpayment/${grandtotal}`}> 
   <button onClick={ssss} className="switch" >Proceed to Pay</button>
   </Link>
  </div>
        </>
    )
}












// {cart.map((data)=>(
//   <tbody>
//     <tr>
//       <td>{data.cakeid}</td>
//       <td>{data.cakename}</td>
//       <td>{data.cakecategory}</td>
//       <td>{data.brand}</td>
//       <td>{`/creamyhub/static/${data.image}`}</td>
//     </tr>
//     {/* <!-- Add more rows for other products if needed --> */}
//   </tbody>
//   ))}