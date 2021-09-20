import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { RootState } from "../Store"

export const register = createAsyncThunk (
  "users/register",
  async (user: any, thunkAPI) => {
    try {
      const response:any = 
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, user) 
      return response.data;
    } catch (err: any) {
      //console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data.message); 
    }

  }
)

export const login = createAsyncThunk (
  "users/login",
  async (user: any, thunkAPI) => {
    try {
      const response: any = 
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, user)
      
      console.log(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data))
      window.location.href = "/";
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const updateUser = createAsyncThunk (
  "users/update",
  async (user: any, thunkAPI) => {
    try {
      const response:any = 
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/update`, user) 
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      //console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data.message); 
    }

  }
)

export const getAllUsers = createAsyncThunk (
  "users/getallusers",
  async (_, thunkAPI) => {
    try {
      const response:any = 
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/getallusers`) 
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message); 
    }
  }
)

export const deleteUser = createAsyncThunk (
  "users/deleteuser",
  async (userid: any, thunkAPI) => {
    try {
      const response:any = 
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/deleteuser`,{userid: userid}) 
      console.log(response.data);
      alert(`User deleted successfully`);
      window.location.reload();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message); 
    }
  }
)


type user =  {
  status: any,
  error: any
  user: any, 
  users:any,
}

//check State in Local Storaage
const UserInLocalStorage = JSON.parse(localStorage.getItem("currentUser") || "{}");
const currentUser = Object.keys(UserInLocalStorage).length ? UserInLocalStorage : null; 

const initialState: user = {
  status: null,
  error: null,
  user: currentUser,
  users: [],
}

export const userSlice = createSlice ({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("currentUser");
      //localStorage.removeItem("cartItems");
      window.location.href="/login";
      state.user = null;
    }
  },
  extraReducers: {
    [register.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [register.fulfilled.type]: (state, action) => {
      state.status = "complete";
      //state.user  = action.payload;
      state.error = null;
    },
    [register.rejected.type]: (state, action) => {
      state.status = "failed"
      state.error = action.payload;
    },
    
    [login.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [login.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.user  = action.payload;
      state.error = null;
    },
    [login.rejected.type]: (state, action) => {
      state.status = "failed"
      state.error = action.payload;
    },
    
    [updateUser.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [updateUser.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.error = null;
    },
    [updateUser.rejected.type]: (state, action) => {
      state.status = "failed"
      state.error = action.payload;
    },
    
    [getAllUsers.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getAllUsers.fulfilled.type]: (state, action) => {
      state.status = "complete";
      state.error = null;
      state.users = action.payload;
    },
    [getAllUsers.rejected.type]: (state, action) => {
      state.status = "failed"
      state.error = action.payload;
    },
    
    [deleteUser.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [deleteUser.fulfilled.type]: (state, action) => {
      state.status = "complete";
      state.error = null;
    },
    [deleteUser.rejected.type]: (state, action) => {
      state.status = "failed"
      state.error = action.payload;
    },
  }
});

export const {
  logout
} = userSlice.actions

export default userSlice.reducer
