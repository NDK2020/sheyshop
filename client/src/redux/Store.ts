import { configureStore } from "@reduxjs/toolkit"
import productReducer from "./store/productSlice"
import productIdReducer from "./store/productIdSlice"
import cartReducer from "./store/cartSlice"
import userReducer from "./store/userSlice"
import orderReducer from "./store/ordersSlice";

const Store = configureStore({
  reducer: {
    productData: productReducer, 
    productId: productIdReducer, 
    cartData: cartReducer,
    user: userReducer,
    orderData: orderReducer,
  }
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch

export default Store;
