import React, { useState } from "react";
import "../Admin/Insertproduct.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Insertproduct() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({});

  console.log(admin);
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };
// console.log();
  const productadd = (e) => {


    e.preventDefault();
    const formData= new FormData()
    formData.append('image',admin.image)
    formData.append('cakename',admin.cakename)
    formData.append('cakeprice',admin.cakeprice)
    formData.append('cakecategory',admin.cakecategory)
    formData.append('brand',admin.brand)


    axios
      .post(" http://127.0.0.1:8000/api/caketableAPIView", formData)
      .then((res) => {
        console.log(res);
        navigate("/");
        navigate("/singleview")
        localStorage.setItem('cakeid'.JSON.stringfy(res.data.data.cakid))
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //  const handleImagechange =(e) =>{

  //  }

  return (
    <>
      <h2>Cake Information</h2>
      <form>
        <table>
          <tbody>
            <tr>
              <th>cake name</th>
              <th>Cake Price</th>
              <th>Cake Category</th>
              <th>Brand</th>
              <th>Image</th>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="cakename"
                  onChange={handleAdminChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="cakeprice"
                  onChange={handleAdminChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="cakecategory"
                  onChange={handleAdminChange}
                />
              </td>
              <td>
                <input type="text" name="brand" onChange={handleAdminChange} />
              </td>
              <td>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setAdmin({ ...admin, image: e.target.files[0] })
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={productadd}>Save</button>
      </form>
    </>
  );
}
