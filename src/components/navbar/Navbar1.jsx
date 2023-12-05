import React from "react";
import "../navbar/Navbar1.css";

import { AiOutlineFileSearch } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";


export default function Navbar1(){
    return(
        <>
         <nav className="navbar1">
    <a href="#" className="logo">
      <img src={''} alt=""/>
    </a>
    <form className="search-bar">
      <input type="text" placeholder="Search" />
      <button type="submit"><AiOutlineFileSearch/></button>
    </form>
    <div className="wishlist">
      <button className="wishlist-icon"><FaHeart/></button>
      <span className="wishlist-text1">Wishlist</span>
    </div>
    <div className="my-account">
      <button className="my-account-icon"><FaUser/></button>
      <span className="my-account-text">My Account</span>
    </div>
    <div className="shopping-cart">
      <button className="cart-icon"><FaShoppingBasket/></button>
      <div className="cart-box">
        <span className="item-count">0</span>
        <span className="cart-amount">Rs 0.00</span>
      </div>
    </div>
  </nav>
        </>
    )
}