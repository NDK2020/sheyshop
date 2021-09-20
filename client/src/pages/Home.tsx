import React, {useEffect, useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Product from "../components/Product";
import Filter from "../components/Filter";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {getAllProducts} from "../redux/store/productSlice";

function Home() {

  const dispatch = useAppDispatch();
  const productData = useAppSelector(state => state.productData);
  const {allProducts, status} = productData

// test
  useEffect(() => {
    dispatch(getAllProducts());  
  },[])

  return (
    <div>
      
      <Filter />
    
      <div className="row justify-content-center mx-2">
        {
          status == "loading" ? (
          <Loader />
          ) : status == "failed" ? (
            <Error error={"Something went wrong"}/>
          ) : allProducts.length > 0 && (allProducts.map((product:any) => {
            return ( 
              <div 
              className="col-md-3 m-2 p-2 text-left 
              shadow p-3 mb-5 rounded card" 
              key={product._id}>
                <Product product={product}/>
              </div>
            )
          }))
        }  
      </div>
      
    </div>
  );
}

export default Home;
