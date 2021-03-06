import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {getOrderById} from "../redux/store/ordersSlice";

interface ParamTypes {
  orderid: string;
}

function OrderInfoPage() {
  const dispatch = useAppDispatch();
  let {orderid: orderId} = useParams<ParamTypes>();
  const {order, status} = useAppSelector(state => state.orderData);

  useEffect(() => {
    dispatch(getOrderById(orderId));  
  },[dispatch]);

  return (
    <div>

      {status == "failed" && <Error error="something went wrong" />}
      {status == "loading" && <Loader /> }
      {status == "complete" && (
        <div className="row justify-content-center">

          <div className="col-md-5 card mt-3 mx-2">

            <h2>Items In Your Order</h2>  
            <hr />
            {
              order.orderItems.map((item: any) => {
                return (
                  <div className="orderitem">
                    <h1>{item.name}</h1>
                    <h1>Quantity: <b>{item.name}</b></h1>
                    <h1>
                      Price: {item.quantity} pcs * {item.price} VND = {item.price*item.quantity} VND
                    </h1>
                    <hr />
                  </div>
                )})
            }

          </div>  

          <div className="col-md-5 card text-end mt-3 mx-2">

            <h2>Order Details</h2>
            <hr />
            
            <h3><b>Order Id:</b> {order._id}</h3>
            <h3><b>Order Amount:</b> {order.orderAmount}</h3>
            <h3><b>Date of Order:</b> {order.createdAt.substring(0, 10)}</h3>
            <h3><b>Transaction ID:</b> {order.transactionId}</h3>
            
            {
              order.isDelivered 
                ?   <h3>Order Delivered</h3>
                :   <h3> Order Placed </h3>
            }

            <hr />
            
            <div >
              
              <h2>Shipping Details</h2>

              <h1 className="text-end">Address: <b>{order.shippingAddress.address}</b></h1>
              <h1 className="text-end">City: <b>{order.shippingAddress.city}</b></h1>
              <h1 className="text-end">Country: <b>{order.shippingAddress.country}</b></h1>
              
            </div>

          </div>  

        </div>

      )} 

      <hr />
      
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2>Replacement Condidtion</h2>
          <p>
          A free replacement cannot be created for an item which was returned and replaced once earlier. If your item is not eligible for free replacement due to any reason, you can always return it for a refund. If the item has missing parts or accessories, you may try to contact the manufacturer for assistance. Manufacturer contact information can usually be found on the item packaging or in the paperwork inluded with the item.
          </p>
        </div>
      </div>

    </div>
  );
}

export default OrderInfoPage;

