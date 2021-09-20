import React, {useState} from "react";
import Rating from "react-rating";
import {useAppSelector, useAppDispatch} from "../redux/hook"
import {addProductReview} from "../redux/store/productSlice";

function ReviewProduct (props: any) {

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.user);

  const {product} = props;
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  return (
    <div className="shadow p-3 mb-5 rounded mx-2">
      <h2>Give Your Review</h2>
      <Rating
        initialRating={product.rating}
        emptySymbol="fa fa-star-o fa-2x empty"
        fullSymbol="fa fa-star fa-2x full"
        onChange={onChangeRating}
      />
      <input
        type="text"
        className="form-control mt-2 ml-5" 
        value={comment}
        onChange={onChangeComment}
      />

      <button 
        className="btn mt-3" 
        onClick={onClickSendReview}
      >
        Submit Review
      </button>

      <h2 className="mt-3">Latest Reviews</h2>
      {
        Object.keys(product).length && product.reviews.map((review: any) => {
          return (
            <div>
              <Rating
                initialRating={review.rating}
                emptySymbol="fa fa-star-o fa-2x empty"
                fullSymbol="fa fa-star fa-2x full"
                readonly={true}
              />
              <p>{review.comment}</p>
              <p>By: {review.name}</p>
              <hr />
            </div>
            
          )
      })
      }
    </div>
  )

  function onChangeRating(e: number) {
    setRating(e);
  }

  function onChangeComment(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  function onClickSendReview(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    
    if (!currentUser) {
      alert(`User must Login before review`);
      return;
    } 
    
    const review = {
      rating: rating,
      comment: comment
    }
    var alreadyReviewed;

    for (var i = 0; i < product.reviews.length;i++) {
      if (product.reviews[i].userid == currentUser._id) {
        alreadyReviewed = true;
      }
    }

    if (alreadyReviewed) {
      alert("You have already reviewed this product");
    } else {

      const productid = product._id;
      dispatch(addProductReview({review, productid, currentUser}));

    }
  }

}

export default ReviewProduct;

