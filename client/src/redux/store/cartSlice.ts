import { createAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store"

type ItemInfo = {
  name: string,
  _id: string,
  price: number,
  countInStock: number,
  quantity: number,
}

var dummyItem: ItemInfo = {
  name: "",
  _id:"",
  price:0,
  countInStock: 0,
  quantity: 0,
}

interface iCart {
  cartItems: Array<ItemInfo>;
}

const cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems') || "{}");
const initialState: iCart = {
  cartItems: Object.keys(cartItemsInLocalStorage).length ?  
    cartItemsInLocalStorage : [],  
}

export const cartSlice = createSlice ({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      var {product, quantity} = action.payload;
      let temp = assignItem(product, quantity);
      
      const alreadyExist = state.cartItems!.findIndex((item: any) => {
        return item._id == product._id;  
      })
      console.log(alreadyExist);
      
      if (alreadyExist > -1) {
        state.cartItems![alreadyExist] = temp;
      } else {
        state.cartItems!.push(temp);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    }, 
    deleteItemById: (state, action) => {
      if (state.cartItems && state.cartItems.length) {
        state.cartItems.splice(action.payload, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
  }
});

function assignItem (product: any, quantity: any) {
  let temp = {...dummyItem}
  temp.quantity = quantity;
  temp.name = product.name;
  temp._id = product._id;
  temp.countInStock = product.countInStock;
  temp.price = product.price;
  return temp;
}

export const {
  addToCart,
  deleteItemById
} = cartSlice.actions

export default cartSlice.reducer
