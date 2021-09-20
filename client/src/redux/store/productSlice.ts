import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../Store"
import axios from "axios"
interface iProduct {

  allProducts: Array<any>,
  status: string | null,
  addProductStatus: string | null,
  product?: any 
}

const initialState: iProduct = {
  allProducts: [],
  status: null,
  product: undefined,
  addProductStatus: null
}

export const getAllProducts = createAsyncThunk (
  "products/getallproducts",
  // async (dispatch, getState) => {
  //   return await fetch("https://jsonplaceholder.typicode.com/users")
  //  .then ((res) => res.json())
  // }
  async (_, thunkAPI) => {
    try {
      //const response:any = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products/getallproducts`)
      const response:any = await axios.get(`/api/products/getallproducts`)
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message});
    }

  }
)

export const filterProducts = createAsyncThunk (
  "products/filterProducts",
  async (props: any, thunkAPI) => {
    const {searchKey, sortKey, category} = props;

    try {
      const response: any = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/products/getallproducts`)
      var filteredProducts   = response.data;

      if (response.data.length) {
        if (searchKey) {
          filteredProducts = response.data.filter( (product:any) => {
            return product.name.toLowerCase().includes(searchKey);
          }
                                                 )  
        }

        if (sortKey !== "popular") {
          if (sortKey == "hightolow") {
            filteredProducts = response.data.sort((a: any, b: any) => {
              return -a.price + b.price;
            })
          } else if (sortKey == "lowtohigh") {
            filteredProducts = response.data.sort((a: any, b: any) => {
              return a.price - b.price;
            })
          }  
        }

        if (category != "all") {
          filteredProducts = response.data.filter((product: any) => {
            return product.category.toLowerCase().includes(category);
          })
        }

        return filteredProducts;
      }

    } catch (err: any) {
      return err.thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const addProductReview = createAsyncThunk(
  "product/addproductreview",
  async (props: any, thunkAPI) => {
    const {review, productid, currentUser} = props;
    try {
      const response:any = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/products/addproductreview`, {
        review: review,
        productid: productid,
        currentUser: currentUser,
      }); 
      console.log(response.data);
      alert(`Your review submitted successfully`);
      window.location.reload();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const addProduct = createAsyncThunk(
  "products/addproduct",
  async (product: any, thunkAPI) => {
    try {
      const response:any = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/products/addproduct`, product); 
      console.log(response.data);
      //alert(`Add new product successfully`);
      //window.location.reload();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
)

export const deleteProduct = createAsyncThunk (
  "users/deleteproduct",
  async (productid: any, thunkAPI) => {
    try {
      const response:any = 
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/products/deleteproduct`,{productid: productid}) 
      console.log(response.data);
      alert(`Product deleted successfully`);
      window.location.reload();
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message); 
    }
  }
)


export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts= action.payload
    }, 
  },
  extraReducers: {
    [getAllProducts.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [getAllProducts.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.allProducts  = action.payload
    },
    [getAllProducts.rejected.type]: (state, action) => {
      state.status = "failed"
    },

    [filterProducts.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [filterProducts.fulfilled.type]: (state, action) => {
      state.status = "complete"
      state.allProducts  = action.payload
    },
    [filterProducts.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [addProductReview.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [addProductReview.fulfilled.type]: (state, action) => {
      state.status = "complete"
    },
    [addProductReview.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [deleteProduct.pending.type]: (state, action) => {
      state.status = "loading"
    },  
    [deleteProduct.fulfilled.type]: (state, action) => {
      state.status = "complete"
    },
    [deleteProduct.rejected.type]: (state, action) => {
      state.status = "failed"
    },
    
    [addProduct.pending.type]: (state, action) => {
      state.addProductStatus = "loading"
    },  
    [addProduct.fulfilled.type]: (state, action) => {
      state.addProductStatus = "complete"
    },
    [addProduct.rejected.type]: (state, action) => {
      state.addProductStatus = "failed"
    },

  }
}) 

export const {
  setAllProducts
} = productSlice.actions

export const selectALlProducts = (state: RootState) => state.productData.allProducts
export const selectProduct = (state: RootState) => state.productData.product
export default productSlice.reducer

