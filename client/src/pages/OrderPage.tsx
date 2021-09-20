import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {getOrdersByUserId} from "../redux/store/ordersSlice";

function OrderPage() {

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);
  const {orders, status} = useAppSelector(state => state.orderData);

  useEffect(() => {
    if (Object.keys(currentUser).length) {
      dispatch(getOrdersByUserId(currentUser._id));  
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (

    <div>

      <div className="row justify-content-center mt-5">

        <div className="col-md-8 table-responsive">
          <h2>MY ORDERS</h2>  

          <table className="table table-striped ">

            <thead>
              
              <tr>
                <th> Order ID </th>
                <th> Amount </th>
                <th> Date </th>
                <th> Transationc ID </th>
                <th> Status </th>
              </tr>
              
            </thead>

            <tbody>
              {
                status == "loading" && <Loader />
              }
              {
                status == "failed"  && <Error error="something went wrong" />
              }
              
              {
                status == "complete" && orders.map((order: any) => {
                  return (
                      
                    <tr
                      id={order._id}
                      onClick={onClickToOrderInfoPage}
                    >

                      <td id={order._id}>{order._id}</td>
                      <td id={order._id}>{order.orderAmount}</td>
                      <td id={order._id}>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td id={order._id}>{order.transactionId}</td>
                      <td id={order._id}>{order.isDelivered 
                          ? <li> Delivered </li> 
                          : <li> Order Placed </li>}
                      </td>

                    </tr>
                      
                  )
              })
              }
            </tbody>

          </table>
        </div>

      </div>

    </div>
  )

  function onClickToOrderInfoPage(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
    //console.log(e.currentTarget.id);
    const orderid = e.currentTarget.id;
    window.location.href=`/orderinfo/${orderid}`  
  }

}

export default OrderPage
