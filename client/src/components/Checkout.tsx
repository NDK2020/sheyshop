import React from "react";
import StripeCheckout from "react-stripe-checkout";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {placeOrders} from "../redux/store/ordersSlice";
import Error from "./Error";
import Loader from "./Loader";
import Success from "./Success";

function Checkout(props: any) {
  const {amount} = props;
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);
  const cartItems = useAppSelector(state => state.cartData.cartItems);
  const orderStatus = useAppSelector(state => state.orderData.status);
  
  return (
    <div>
      {
        orderStatus == "loading" && <Loader />
      }

      {
        orderStatus == "complete" && <Success success="Your Order Placed Sucessfully" />
      }
      {
        orderStatus == "failed" && <Error error="Something went wrong" />
      }
   
      <StripeCheckout 
        token={tokenHandler}
        amount={amount * 100}
        shippingAddress
        currency="INR"
        stripeKey={String(process.env.REACT_APP_STRIPE_KEY)}
      > 
        <button className="btn" onClick={onClickValidate}>
          PAY NOW
        </button>
      </StripeCheckout>
      
    </div>    
  )

  function tokenHandler (token: any) {
    console.log(token);  
    
    const orderItems = new Array();
    for (let i = 0; i < cartItems.length; i++) {
      var item = {
          name : cartItems[i].name,
          quantity : cartItems[i].quantity,
          price: cartItems[i].price,
          _id: cartItems[i]._id
      }

      orderItems.push(item);
    }

    const orders = {
      token       : token,
      subTotal    : amount,
      currentUser : currentUser,
      orderItems   : orderItems,
    }
    
    dispatch(placeOrders(orders));
  }

  function onClickValidate() {
    if (!currentUser) 
      window.location.href='/login';
  } 
}

export default Checkout;

// MOCK DATA
//card number: 4242 4242 4242 4242
//time exp: 12/23
//cvc: 123
