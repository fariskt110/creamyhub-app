import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import Navbar from "../../components/navbar/Navbar";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "bootstrap";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from "../../Redux/Reducer/Productslice";
import toast,{Toaster} from "react-hot-toast";

export default function Home() {
  // const [cakelist, setCakeList] = useState([]);
  // const[wishlist,setWishlist]=useState({});
  // console.log(cakelist);
  const user = localStorage.getItem("user_id");
  console.log(user);


 const status = useSelector((state)=> state.product.status)
 const cakelist=useSelector((state)=> state.product.productsdata);

 const dispatch=useDispatch()

  useEffect(() => {
    // axios.get(" http://127.0.0.1:8000/api/Get_All_cakes").then((response) => {
    //   setCakeList(response.data.data);
    //   console.log(response.data.data);
    // });
    dispatch(getProducts());

  }, [dispatch]);
  const basket = (wid,e) => {
    e.preventDefault();
    const data = {
      user_id: user,
      cakeid: wid,
    };
    axios
      .post("http://127.0.0.1:8000/api/add_wishlist_api", data)
      .then((response) => {
        console.log(response.data.message);
        toast.success("product added to wishlist sucessfully.");
        setTimeout(() => {
          Navigate("/")
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  const cart = (kotta, e) => {
    e.preventDefault();
    const data = {
      userid: user,
      cakeid: kotta,
      quantity:1
      
    };
   

    axios
      .post("http://127.0.0.1:8000/api/Add_cartviewAPIView", data)
      .then((response) => {
        console.log(response.data.data);
        toast.success("product added to cart sucessfully")
        setTimeout(() => {
          Navigate('/')
          
        }, 2000);
      }).catch((error)=>{
        console.log(error);
      });
  };
  const handleImageError = (e) => {
    e.target.src = '/creamyhub/static/images/cake2.jpeg'; // Replace with the path to your placeholder image
  };
  const style = {
    color: 'red',
    
  };


  return (
  
    <>
    <div><Toaster/></div>
      <div class="carousel">
        <div class="carousel-slide">
          <img  src={"/creamyhub/static/images/caro1.jpg"} alt="Image 1" />
        </div>
        <div class="carousel-slide">
          <img  src={"/creamyhub/static/images/caro2.jpg"} alt="Image 2" />
        </div>
        <div class="carousel-slide">
          <img  src={"/creamyhub/static/images/cake1.jpg"} alt="Image 3" />
        </div>
      </div>
      {/* Heading Section */}
      <div className="section-heading">
        <h1>THE BEST IN BEST</h1>
        <div className="underline" />
      </div>
      {/* Subheading Section */}
      <div className="subheading">
        <h2>MOST POPULAR TASTE BRANDS</h2>
        <p>Delivery only to KOZHIKODE city and locations listed.</p>
      </div>
      {/* Categories Navbar */}
      <nav className="categories-navbar">
        <ul>
          <li>
            <a href="#">ALL</a>
          </li>
          <li>
            <a href="#">FRESH CREAM CAKES</a>
          </li>
          <li>
            <a href="#">CHOCOLATE CAKES</a>
          </li>
          <li>
            <a href="#">DESIGNER CAKES</a>
          </li>
          <li>
            <a href="#">SPECIAL CAKES</a>
          </li>
          <li>
            <a href="#">DRY FRUIT &amp; NUT CREAM CAKES</a>
          </li>
          <li>
            <a href="#">FRESH FRUIT CAKES</a>
          </li>
        </ul>
      </nav>
      {cakelist.map((data) => (
        <section className="producct-section">
          <div className="producct-card">
          <Link to={`/singleview/${data.id}`}> <img className="picture" src={`/creamyhub/static/${data.image}`} onError={handleImageError} /></Link>
            <div className="producct-card-content">
              <h3>{data.cakename}</h3>
              <p>{data.cakeprice}</p>
              <p style={style}>{data.cakecategory}</p>
              <p>{data.brand}</p>
              <button
                className="addd-to-cart"
                onClick={(e) => {
                  cart(data.id,e);
                }}
              >
                <FaShoppingCart />
              </button>
              <button
                className="addd-to-wishlist"
                onClick={(e) => {
                  basket(data.id,e);
                }}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </section>
      ))}
      ;
    </>
  );
}
