import  React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {getAllOrders} from "../redux/store/ordersSlice";
import {deleteUser, getAllUsers} from "../redux/store/userSlice";
import Error from "./Error";
import Loader from "./Loader";
import Success from "./Success";

function OrdersList() {
  const dispatch = useAppDispatch();
  const {status, orders} = useAppSelector(state => state.orderData);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [])
  
  return (
    <div className="table-responsive">
      {
        status == "loading" && <Loader />
      }
      {
        status == "failed" && <Error error="something went wrong..." />
      }

      <h2>OrdersList</h2>
      <table className="table table-bordered text-center ">
        
        <thead>

          <tr>

            <td>Order Id</td>
            <td>Email</td>
            <td>Amount</td>
            <td>User Id</td>
            <td>Date</td>
            <td>Transaction Id</td>

          </tr>  

        </thead>

        <tbody>
          {
            Object.keys(orders).length && orders.map((order: any) => {
              return (
                <tr  id = {order._id}
                  onClick={onClickToOrderInfoPage}>
                  <td id={order._id}>{order._id }</td>
                  <td id={order._id}>{order.email}</td>
                  <td id={order._id}>{order.userid}</td>
                  <td id={order._id}>{order.orderAmount}</td>
                  <td id={order._id}>{order.createdAt.substring(0, 10)}</td>
                  <td id={order._id}>{order.transactionId}</td>
                </tr>
              )   
            }) 
          }
        </tbody>
        
      </table>
      
    </div>
  )  
  
  function onClickToOrderInfoPage(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
    //console.log(e.currentTarget.id);
    const orderid = e.currentTarget.id;
    window.location.href=`/orderinfo/${orderid}`  
  }
}

export default OrdersList;
