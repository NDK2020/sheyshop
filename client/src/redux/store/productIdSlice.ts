import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../Store"
import axios from "axios"
import {axiosInstance} from "../../config"

type ProductId = {
  status: any,
  product: any, 
  editStatus: any,
}

const initialState: ProductId = {
  status: null,
  editStatus: null,
  product: {}
}

export const getProductById = createAsyncThunk (
  "products/getproductbyid",
  async (productId: string, thunkAPI) => {
    try {
      
      // const response: any = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/products/getproductbyid`,{
      //   productId: productId,
      // })
      const response: any = await axiosInstance.post(`/api/products/getproductbyid`,{
        productId: productId,
      })
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.message});
    }
  }
)

export const editProduct = createAsyncThunk(
  "products/editproduct",
  async (product: any, thunkAPI) => {
    try {
      // const response:any = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/products/editproduct`, product); 
      const response:any = await axiosInstance.post(`${process.env.REACT_APP_SERVER_URL}/api/products/editproduct`, product); 
      console.log(response.data);
      //alert(`Add new product successfully`);
      window.location.href = "/admin/productslist";
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const productIdSlice = createSlice({
  name: "productIdSlice",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product= action.payload
    }, 
    resetStatus: (state) => {
      state.status = null;
    }, 
  },
  extraReducers: {
    [getProductById.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getProductById.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.product  = action.payload
    },
    [getProductById.rejected.type]: (state, action) => {
      state.status = "failed"
      state.product = action.payload
    },
    [editProduct.pending.type]: (state, action) => {
      state.editStatus = "loading"
    },  
    [editProduct.fulfilled.type]: (state, action) => {
      state.editStatus = "complete"
    },
    [editProduct.rejected.type]: (state, action) => {
      state.editStatus = "failed"
    },
    
  }
}) 
    
export const {
  setProduct,
  resetStatus,
} = productIdSlice.actions

export const selectProduct = (state: RootState) => state.productData.product
export default productIdSlice.reducer

