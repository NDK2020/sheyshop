import React, {useEffect, useState} from "react";
import ReviewProduct from "../components/ReviewProduct";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {addToCart} from "../redux/store/cartSlice";
import {getProductById} from "../redux/store/productIdSlice";
import {numberWithCommas} from "../common/UtilityFunctions";
import { useMediaQuery } from "react-responsive";

  interface ParamTypes {
    id: string;
  }
  
function ProductPage() {
  
  // global state
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(1)
  const {product, status} = useAppSelector(state => state.productId);
  
  //local state
  let {id: productId} = useParams<ParamTypes>();
   
  useEffect(() => {
    dispatch(getProductById(productId));
  },[])
  
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1000px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 3824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
  
  return (
    <div>
      {
        status == "loading" ? (
          <h1> Loading... </h1>
        ) : status == "failed" ? (
          <h1> Something went wrong </h1>
        ) :         
          <div className="row mt-5">
            
            <div className="col-md-6">
              <div className="card p-2 m-2 shadow p-3 mb-5 rounded">
                <h2><b>{product!.name}</b></h2>  

                {
                  isDesktopOrLaptop && (
                    <img src={product!.image}
                      className="img-fluid m-3 desktop-img"
                      
                    />
                  )
                }
                
                {
                  isBigScreen && (
                    <img src={product!.image}
                      className="img-fluid m-3 big-img"
                      
                    />
                  )
                }
                
                {
                  isTabletOrMobile && (
                    <img src={product!.image}
                      className="img-fluid m-3 mobile-img"
                      
                    />
                  )
                }
                
                <p>{product!.description}</p>
              </div>   
            </div>

            <div className="col-md-6 text-left">
              
              <div className="mx-2 mt-2 mr-0 shadow p-3 mb-5 rounded">
                <h2>Price: <b>{product.price && numberWithCommas(product!.price)} VND</b></h2>  
              <hr />
              
              <h1>Select Quantity</h1>
              <select value={quantity} onChange={onChangeSelect}>
                {product && 
                  [...Array(product.countInStock)].map((item, index): any => {
                    return (
                      <option value={index + 1}>{index + 1}</option>
                    )  
                })}
              </select>
              
              <hr />
                {
                  product.countInStock > 0 ? ( 
                    <button className='btn btn-dark' onClick={onClickCart}>
                      ADD TO CART
                    </button>
                  ) : (
                    <div>
                      <h1>Out of Stock</h1>
                      <button className='btn' disabled onClick={onClickCart}>
                        ADD TO CART (No Quantity)
                      </button>
                    </div>
                 
                  )
                }
                
                
              </div>

              
              <ReviewProduct product={product}/>

            </div>
        
      </div>

      }  
    </div>  
  )
  
  function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setQuantity(Number(e.target.value));  
  }

  function onClickCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    //alert(quantity);
    dispatch(addToCart({product, quantity}));
  }
}

export default ProductPage;

