import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";
import {numberWithCommas} from "../common/UtilityFunctions";


function Product(props: any) {
  const {product} = props;
  return (
    <Link to={`product/${product._id}`} style={{textDecoration: "none"}}>
      <h1 style={{fontSize: "20px"}}>{product.name} </h1>
      <div className="text-center mb-1 p-3">
        <img src={product.image} className="img-fluid" />
      </div>
      
      <div
        className="p-0"
        style={{position: "absolute", bottom: "0px"}}
      >
        <Rating
          initialRating={product.rating}
          emptySymbol="fa fa-star-o fa-1x empty"
          fullSymbol="fa fa-star fa-1x full"
          readonly={true}
        />
        <h1 >Price: {numberWithCommas(product.price)} VND</h1>
    </div>
    </Link>
  )
}
export default Product;

