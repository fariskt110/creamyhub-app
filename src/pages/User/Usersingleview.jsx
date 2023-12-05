import React, { useEffect, useState } from "react";
import "../User/Usersingleview.css"
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Usersingleview(){
    const {id} =useParams()
    const cake=localStorage.getItem('cakeid')
    const[product,SetProduct]=useState([]);
    console.log(product);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/Get_single_cake/${id}`).then((response)=>{
        SetProduct(response.data.data)
        console.log(response.data.data);    
        })
    })
    return(
        <>
<section className="product-section">
         <div className="product-card">
         {/* <img  src={`/creamyhub/static/${data.image}`} alt="Cake 1" /> */}
         <div className="product-card-content">
        <h3>{product.cakename}</h3>
        <p>{product.cakeprice}</p>
        <p>{product.cakecategory}</p>
        <p>{product.brand}</p>
        <p> <img  src={`/creamyhub/static/${product.image}`} alt="Cake 1" /> </p>
        

      </div>
    </div>
    </section>
        </>
    )
}