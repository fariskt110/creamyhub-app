import React, { useState } from "react";
import "../Login/Resetpassword.css";
import { FaRegMessage } from "react-icons/fa6";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Resetpassword() {
  const [newpassword, setNewpassword] = useState("");
  const [retypenewpassword, setRetypenewpassword] = useState("");
  const navigate=useNavigate();

  const update = (event) => {
    event.preventDefault();
  
    if (newpassword !== retypenewpassword) {
      alert("New password and retype new password must be the same");
      return;
    }
  
    const data = {
      password: newpassword,
    };
  
    axios.put("http://127.0.0.1:8000/api/Update_passwordAPIView", data)
    .then((response) => {
        console.log("API Response:", response.data);
        
        if (response.data ) {
          
          navigate('/Login');
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update password. Check the console for details.");
      });   
    }   

  return (
    <>
      <form>
        <TextField
          variant="outlined"
          label="New Password"
          value={newpassword}
          onChange={(event) => setNewpassword(event.target.value)}
        />
        <br />
        <TextField
          variant="outlined"
          label="Retype New Password"
          value={retypenewpassword}
          onChange={(event) => setRetypenewpassword(event.target.value)}
        />
        <br />
        <Button variant="contained" startIcon={<FaRegMessage />} className="buton" onClick={update}>
          Update
        </Button>
      </form>
    </>
  );
}
