import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {FaRegTrashAlt} from "react-icons/fa";
import {addToCart, deleteItemById} from "../redux/store/cartSlice";
import Checkout from "../components/Checkout";

function CartPage () {

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector (state => state.cartData.cartItems);  
  const subTotal = cartItems!.reduce((previousVal, currentVal) => previousVal + (currentVal.price*currentVal.quantity), 0)

  return (
    <div>

      <div className="row mt-3 justify-content-center">
        <div className="col-md-8 card text-center shadow p-3 mb-5 rounded">
          <h2 className="text-center m-5">MY CART</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th> Delete </th>
              </tr>
            </thead>

            <tbody>
              {
                cartItems && cartItems.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <select 
                          value={item.quantity} 
                          data-item={JSON.stringify(item)}
                          onChange={onChangeSelect}
                        >

                          {
                            [...Array(item.countInStock)].map((_, i) => {
                              return (
                                <option value={i + 1}> {i + 1} </option>
                              )
                            })
                          }
                        </select>
                      </td>
                      <td>{item.quantity * item.price}</td>
                      <td>
                        <FaRegTrashAlt
                          onClick={deleteItemFromCart}
                          id={String(index)}
                          style={{color:"red"}}  
                        /> 
                      </td>
                    </tr>
                  )  
                })
              }
            </tbody>
          </table>  

          <hr />
          <h2 className="text-center">
            SubTotal: {subTotal}
          </h2>

          <hr />
          <div className="text-center p-3">

            <Checkout amount={subTotal}/>

          </div>

        </div>
      </div>  

    </div>     
  ); 

  function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    let product = JSON.parse(e.currentTarget.dataset.item!);
    console.log(product);
    let quantity = Number(e.target.value);
    dispatch(addToCart({product, quantity})); 
  } 

  function deleteItemFromCart(e: React.MouseEvent<SVGElement, MouseEvent>) {
    dispatch(deleteItemById(Number(e.currentTarget.id)));
  } 
}

export default CartPage;
