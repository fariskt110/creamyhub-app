import React, { useState } from "react";
import "../Wishlist/Wishlist.css";
import { useEffect } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  // const {id} =useParams()
  // console.log(id);
  const user = localStorage.getItem("user_id");
  console.log(user);

  useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/ViewwishlistReviewAPIView/${user}`)
        .then((response) => {
          setWishlist(response.data.data);
          console.log(response.data.data);
        });
  }, []);


  const clearall = (cakeid) => {
    axios
      .delete(`http://127.0.0.1:8000/api/Delete_wishlistviewAPIView/${cakeid}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <>
      {wishlist.length!==0
      ?(<>
      {wishlist.map((data,) => (
          <section className="prooduct-section">
            <div className="prooduct-card">
              <img src={`/creamyhub/static/${data.image}`} alt="Cake 1" />
              <div className="prooduct-card-content">
                <h3>{data.cakename}</h3>
                <p>{data.cakeprice}</p>
                <p>{data.cakecategory}</p>
                <p>{data.brand}</p>
                <button
                  onClick={() => {
                    clearall(data.id);
                  }}
                  className="add-too-cart"
                >
                  <FiDelete />
                </button>
              </div>
            </div>
          </section>
        ))}
      </>

      ):(
        <h1 className="text-center">Wishlist is empty</h1>
      )
      }
        
        </>
  )
}
