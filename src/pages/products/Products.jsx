import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../products/Products.css"
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axios from "axios";




export default function(){
  const [productlist,setProductList]=useState([]);
   useEffect(()=>{
    axios.get(" http://127.0.0.1:8000/api/Get_All_cakes").then((response)=>{
          setProductList(response.data.data)  
          console.log(response.data.data)  
          });

   },[]);
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
        
      </div>
    </div>
    </section>
  
      
      ))}
        
        </>
    )
}