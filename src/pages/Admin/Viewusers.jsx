import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../Admin/Viewusers.css"
import axios from "axios";





export default function Viewuser(){
    const [user,setUser]=useState([]);
    console.log(user);

    useEffect(()=>{
        axios.get(" http://127.0.0.1:8000/api/Get_All_user").then((response)=>{
        setUser(response.data.data)
        console.log(response.data.data);    
        });
    },[]);
    return(
    
    <>   
        {user.map((data)=>(
      
        <section className="productt-sectionm">
         <div className="productt-cardr">
         {/* <img  src={`/creamyhub/static/${data.image}`} alt="Cake 1" /> */}
         <div className="productt-cardr-content">
        <h3>{data.Name}</h3>
        <p>{data.email}</p>
        <p>{data.Phoneno}</p>
        {/* <p>{data.}</p> */}
        {/* <button onClick={()=>{clearall(data.id)}} >Delete</button> */}
       {/* <Link to={`/admin-update/${data.id}`}><button>Edit</button></Link> */}

      </div>
    </div>
    </section>
      ))};
     </> 
    
        
    )

}