import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import "../User/Userupdate.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Userupdate(){
    const navigate=useNavigate()
    const user=localStorage.getItem('user_id')
    console.log(user);
    const[used,setUser] = useState([]);
      console.log(used);

     useEffect(()=>{
         axios.get(` http://127.0.0.1:8000/api/Get_Single_user/${user}`).then((response)=>{
           console.log(response.data.data);
           setUser(response.data.data);   
         });
    },[]);
    console.log(used);
    const edituser= (e)=>{
        const {name,value }=e.target 
        setUser({...used,[name]: value})
    }
     const update=()=>{
        axios.put(` http://127.0.0.1:8000/api/Update_userAPIview/${user}`,used).then((response)=>{
             console.log(response.data.data);
             navigate('/userview')
            window.location.reload()})

        
    }

    return(
        <>
          
       <div className="caard">
  <div className="caard-boorder-toop">
  </div>
  <div className="imgg">
  </div>
  <input type="text" className="usser" placeholder="Name" name="Name" value={used.Name}  />
<input type="text" className="usser" placeholder="Phoneno" name="Phoneno" value={used.Phoneno} onChange={edituser} />
<input type="text" className="usser" placeholder="email" name="email" value={used.email} onChange={edituser} />
<input type="text" className="usser" placeholder="adress" name="adress"  onChange={edituser} />
<input type="text" className="usser" placeholder="pincode" name="pincode"  onChange={edituser} />
<input type="text" className="usser" placeholder="location" name="location"  onChange={edituser} />
<button className="userclick" onClick={update}>submit</button>
</div> 

        </>
    )
}