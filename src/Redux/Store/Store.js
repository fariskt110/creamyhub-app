import { configureStore } from "@reduxjs/toolkit";
import Productslice from "../Reducer/Productslice";





export default configureStore({
    reducer: {
      product: Productslice,
  
      
    },
  });
  
  
  