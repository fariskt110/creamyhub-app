import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/navbar/Navbar';
import Navbar1 from './components/navbar/Navbar1';
import Products from './pages/products/Products';
import Register from './pages/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Insertproduct from './pages/Admin/Insertproduct';
import Updateproduct from './pages/Admin/Updateproduct';
import Login from './pages/Login/Login';
import Adminview from './pages/Admin/Adminview';
import Viewuser from './pages/Admin/Viewusers';
import Userview from './pages/User/Userview'
import Userupdate from './pages/User/Userupdate';
import Footer from './components/footer/Footer';
import Wishlist from './pages/Wishlist/Wishlist';
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment';
import Usersingleview from './pages/User/Usersingleview';
import Finalpayment from './pages/Payment/Finalpayment';
import Gpay from './pages/Payment/Gpay';
import Cod from './pages/Payment/Cod';
import Creditcard from './pages/Payment/Creditcard';
import Paymentsucessful from './pages/Payment/Paymentsucessful';
import Freshcreamcakes from './pages/Cakes/Freshcreamcakes';
import { useState } from 'react';
import { userContext } from './Context/Context';
import Forgetpassword from './pages/Login/Forgetpassword';
import Verifyotp from './pages/Login/Verifyotp';
 import Resetpassword from './pages/Login/Resetpassword.jsx';
function App() {
  const [Context,setContext]= useState({"name":'ggg'});
  console.log(Context);
  return (
<>
<userContext.Provider value={{Context,setContext}}> 
<Router>

<Navbar/>
<Routes>

  <Route path="/navbar" element={<Navbar/>}></Route>
  <Route path="/nav" element={<Navbar1/>}></Route>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/products" element={<Products/>}></Route>
  <Route path="/Register" element={<Register/>}></Route>
  <Route path="/insert" element={<Insertproduct/>}></Route>
  <Route path="/admin-update/:id" element={<Updateproduct/>}></Route>
  <Route path="/Login" element={<Login/>}></Route>
  <Route path="/admin-view" element={<Adminview/>}></Route>
  <Route path="/viewuser" element={<Viewuser/>}></Route>
  <Route path="/userview" element={<Userview/>}></Route>
  <Route path="/userupdate/:user" element={<Userupdate/>}></Route>
  <Route path="/footer" element={<Footer/>}></Route>
  <Route path="/wishlist" element={<Wishlist/>}></Route>
  <Route path="/cart" element={<Cart/>}></Route>
  <Route path="/payment/:grandtotal" element={<Payment/>}></Route>
  <Route path='/singleview/:id' element={<Usersingleview/>}></Route>
  <Route path='/finalpayment/:grandtotal' element={<Finalpayment/>}></Route>
  <Route path='/gpay' element={<Gpay/>}></Route>
  <Route path='/cod' element={<Cod/>}></Route>
  <Route path='/card' element={<Creditcard/>}></Route>
  <Route path='/paymentwish' element={<Paymentsucessful/>}></Route>
  <Route path='fresh'element={<Freshcreamcakes/>}></Route>
  <Route path='/forgetpassword' element={<Forgetpassword/>}></Route>
  <Route path='/verifyotp' element={<Verifyotp/>}></Route>
   <Route path='/resetpassword' element={<Resetpassword/>}></Route> 
  </Routes>
  <Footer/>
  </Router>
  </userContext.Provider> 

</>
  );
}

export default App;
