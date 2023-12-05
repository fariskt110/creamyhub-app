import React, { useEffect, useState } from "react";
import "../User/Userview.css"
import Navbar from "../../components/navbar/Navbar";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";


export default function Userview(){
    const user=localStorage.getItem('user_id')
    console.log(user);
     const[use,setUser] = useState([]);
      console.log(use);

     useEffect(()=>{
         axios.get(`http://127.0.0.1:8000/api/Get_Single_user/${user}`).then((response)=>{
          setUser(response.data.data); 
          console.log(response.data.data);  
         });
    },[]);
    return(
        <>
       
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
        <Link to={`/userupdate/${use.id}`}><button>Edit</button></Link>
        {/* <button onClick={()=>{clearall(data.id)}} >Delete</button> */}
       {/* <Link to={`/admin-update/${data.id}`}><button>Edit</button></Link> */}

      </div>
    </div>
    </section>
   
        </>
    )
}