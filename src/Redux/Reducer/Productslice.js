import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    productsdata:[],
    status:"idle"
}

export const getProducts=createAsyncThunk("product/get",async()=>{
    const response=await axios.get('http://127.0.0.1:8000/api/Get_All_cakes')
    const result=response.data.data
    return result
    
})
const ProductSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state,action)=>{
        state.status="loading"  
        }).
        addCase(getProducts.fulfilled,(state,action)=>{
            state.status="idle"
            state.productsdata=action.payload

        }).addCase(getProducts.rejected,(state,action)=>{
            state.status="error"
            // console.log(action.payload);

        })
    }
});



export default ProductSlice.reducer;