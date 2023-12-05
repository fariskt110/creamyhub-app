import React, { useEffect, useState } from "react";
import "../Admin/Adminview.css"
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "bootstrap";



export default function Adminview(){
    
        const [productlist,setProductList]=useState([]);
        console.log(productlist);

        useEffect(() => {
          axios.get(" http://127.0.0.1:8000/api/Get_All_cakes").then((response)=>{
          setProductList(response.data.data)  
          console.log(response.data.data)  
          });
        },[]);
        const clearall=(id)=>{
          axios.delete(`http://127.0.0.1:8000/api/Delete_cakeAPIView/${id}`).then((res)=>{
           console.log(res); 
          }).catch((err)=>{
            console.log(err);
          })
        }
        return(
          <>
          {/* src\components\assets\cake2.jpeg */}
          {productlist.map((data)=>(
        <section className="productt-sectionn">
         <div className="productt-cardd">
         <img className="proimg" src={`/creamyhub/static/${data.image}`} alt="Cake 1" />
         <div className="productt-cardd-contentt">
        <h3>{data.cakename}</h3>
        <p>{data.cakeprice}</p>
        <p>{data.cakecategory}</p>
        <p>{data.brand}</p>
        <button onClick={()=>{clearall(data.id)}} >Delete</button>
       <Link to={`/admin-update/${data.id}`}><button>Edit</button></Link>

      </div>
    </div>
    </section>
  
      
      ))}
      </>
    )
}