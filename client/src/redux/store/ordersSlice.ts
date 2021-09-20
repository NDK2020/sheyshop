import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../Store"
import axios from "axios"

export const placeOrders = createAsyncThunk (
  "orders/placeorders",
  async (orders: any, thunkAPI) => {

    try {
      const response: any 
      = await axios.post(`${ process.env.REACT_APP_SERVER_URL }/api/orders/placeorders`, orders);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const getOrdersByUserId = createAsyncThunk (
  "orders/getOrdersByUserId",
  async (userid: any, thunkAPI) => {
    try {
      const response: any = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders/getordersbyuserid`, {userid: userid});
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const getOrderById = createAsyncThunk (
  "orders/getOrderById",
  async (orderid: any, thunkAPI) => {
    try {
      const response: any = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/orders/getorderbyid`, {orderid: orderid});
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
  

export const getAllOrders = createAsyncThunk (
  "orders/getallorders",
  async (_, thunkAPI) => {
    try {
      const response: any = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orders/getallorders` );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

type order = {
  status: string | null,
  orders: any,
  order: any,
}

const initialState: order = {
  status: null, 
  orders: [],
  order: null,
}

export const ordersSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [placeOrders.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [placeOrders.fulfilled.type]: (state, action) => {
      state.status = "complete"
    },
    [placeOrders.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [getOrdersByUserId.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getOrdersByUserId.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.orders  = action.payload
    },
    [getOrdersByUserId.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [getOrderById.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getOrderById.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.order  = action.payload
    },
    [getOrderById.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [getAllOrders.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getAllOrders.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.orders  = action.payload
    },
    [getAllOrders.rejected.type]: (state, action) => {
      state.status = "failed"
    },

  }
})

export const {

} = ordersSlice.actions


export default ordersSlice.reducer
