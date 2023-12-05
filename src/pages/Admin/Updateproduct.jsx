import React, { useState } from "react";
import "../Admin/Updateproduct.css"
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useEffect } from "react";


export default function Updateproduct(){
   const [data,setData] = useState({});
   const navigate = useNavigate()
   const {id}=useParams()
   console.log(id);

   useEffect(() =>{
    axios.get(` http://127.0.0.1:8000/api/Get_single_cake/${id}`).then((response)=>{
      console.log(response.data.data);
      setData(response.data.data);
    });
   },[]);
   console.log(data);
   const editproduct =(e) =>{
    const {name,value }= e.target 
    setData({...data, [name]: value}) 
  }
  const update= ()=>{
    axios.put(`http://127.0.0.1:8000/api/Update_cakerecordAPIview/${id}`,data).then((response)=>{
    console.log(response.data.data);
    navigate('/admin-view')
    window.location.reload()})  
    }
  
    return(
      <>
      <div className="containers">
       <div className="card">
  <div className="card-border-top">
  </div>
  <div  >
    <img classname="image" src="" alt="" />
  </div>
  <input className="product" type="text" placeholder="cakename" name="cakename" value={data.cakename} onChange={editproduct} />
<input className="product" type="text" placeholder="cakeprice" name="cakeprice" value={data.cakeprice} onChange={editproduct} />
<input className="product" type="text" placeholder="cakecategory" name="cakecategory" value={data.cakecategory} onChange={editproduct} />
<input className="product" type="text" placeholder="brand" name="brand" value={data.brand} onChange={editproduct} />
<button  className="submitt" onClick={update}>submit</button>
</div> 
</div>

      </>
    )
}
        