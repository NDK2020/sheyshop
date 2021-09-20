import React from "react";
import Rating from "react-rating";
import {Link} from "react-router-dom";


function Product(props: any) {
  const {product} = props;
  return (
    <Link to={`product/${product._id}`}>
      <h1>{product.name}</h1>
      <div className="text-center">
        <img src={product.image} className="img-fluid" />
      </div>
      <div>
        <Rating
          initialRating={product.rating}
          emptySymbol="fa fa-star-o fa-1x empty"
          fullSymbol="fa fa-star fa-1x full"
          readonly={true}
        />
      </div>
      <h1>Price: {product.price}</h1>
    </Link>
  )
}
export default Product;

