import React, { useEffect, useState } from "react";
import "../navbar/Navbar.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function Navbar() {
 const[wishlist,setWishlist]= useState([])
 const[cart,setCart]=useState([])
 const user = localStorage.getItem("user_id");
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

  const role =JSON.parse(localStorage.getItem("role"));
  const navigate=useNavigate()
  console.log(role);
const logout=()=>{
  localStorage.clear()
  navigate('/')
  window.location.reload()
}
const name=JSON.parse(localStorage.getItem("Name"))
console.log(name);
useEffect(() => {
  if(user!==null){

    axios
    .get(`http://127.0.0.1:8000/api/ViewwishlistReviewAPIView/${user}`)
    .then((response) => {
      setWishlist(response.data.data);
      console.log(response.data.data);
    });
  }
}, []);
useEffect(() => {
  if(user!==null){

    axios
    .get(`http://127.0.0.1:8000/api/ViewcarteviewAPIView/${user}`)
    .then((response) => {
      setCart(response.data.data);
      console.log(response.data.data);
    });
  }
}, []);

const [query, setQuery] = useState("");
const [searchResult, setSearchResult] = useState([]); 

const handleSearch = async () => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/cakeSearchAPIView", { query });
    
    
    setSearchResult(response.data.data);

    console.log(response.data);
  } catch (error) {
    console.error("Error searching:", error);
  }
};
console.log(searchResult);
    

  return (
    <>
      <div className="navbar">
        <a href="/">HOME</a>
        <a href="/products">MENU</a>
        <a href="#">OFFERS</a>
        <>
          {
          role == 'user' ? 
          <>
          <a href="/userview">
          <button className="btn">{name}</button>
        </a>
        <a href="/">
          <button className="btn" onClick={logout}>LogOut</button>
        </a>
        </>
            
           :  role == 'admin'? 
           <>
           <a href="/viewuser">
                <button className="btn">admin</button>
              </a>
              <a href="/insert">
                <button className="btn">Insertproduct</button>
              </a>
              <a href="/admin-view">
                <button className="btn">Viewproduct</button>
              </a>
              <a href="/admin-view">
                <button className="btn">Vieworder</button>
              </a>

              <a href="/">
                <button className="btn" onClick={logout}>LOGOUT</button>
              </a>
           </>
           :


           

            <>
              <a href="/Register">
                <button className="btn">REGISTER</button>
              </a>
              <a href="/Login">
                <button className="btn">LOGIN</button>
              </a>
            </>
          }
        </>

        <div className="search-bar">
          <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="button" onClick={()=>{handleShow();handleSearch()}}   >
            <AiOutlineFileSearch />
          </button>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        {searchResult?.map((data)=>(
           <section className="productt-sectionn">
         <div className="productt-cardd">
         <img className="proimg"  src={`creamyhub${data.image}`} alt="Cake 1" />
         <div className="productt-cardd-contentt">
        <h3>{data.cakename}</h3>
        <p>{data.cakeprice}</p>
        <p>{data.cakecategory}</p>
        <p>{data.brand}</p>
        
      </div>
    </div>
    </section>
    ))}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
         
        </div>
        <a href="/cart">
          <span>{cart.length}</span>
          <FaShoppingCart />
        </a>
        <a href="/wishlist">
          <span>{wishlist.length}</span>
          <FaHeart />
        </a>
      </div>
    </>
  );
}
