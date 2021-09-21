import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AiTwotoneEdit} from "react-icons/ai";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {editProduct, getProductById, resetStatus} from "../redux/store/productIdSlice";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";


  interface ParamsTypes {
    productid: string;
  }

function EditProduct() {
  const dispatch = useAppDispatch();
  const {editStatus, status, product} = useAppSelector(state => state.productId); 
  
  
  const {productid: productId} = useParams<ParamsTypes>(); 
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState<number | undefined>(product.price);
  const [countInStock, setCountInStock] = useState<number | undefined>(product.countInStock);
  const [imageurl, setImageUrl] = useState(product.image);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description);

  // useEffect(() => {
  //   dispatch(resetStatus());  
  // }, []);
  
  useEffect(() => {
    if (Object.keys(product).length > 0 && product._id == productId) {
        setName(product.name);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setImageUrl(product.image);
        setCategory(product.category);
        setDescription(product.description);
    } else {
      dispatch(getProductById(productId));
    }
  }, [product])

  return (
    
    <div>
      <h2>Edit Product</h2>
      
      {
        Object.keys(product).length > 0 && 
          <div>
            
              {
                editStatus == "loading" && <Loader />
              }
              {
                editStatus == "failed" && <Error error="Something went wrong" />
              }
              {
                editStatus == "complete" && <Success success="Edit Product successful" />
              }
             <form onSubmit={editCurrentProdut}>
              <input
                type="text"
                placeholder="name"
                className="form-control"
                required
                value={name}
                onChange={onChangeName} 
              />

              <input
                type="text"
                placeholder="price"
                className="form-control"
                required
                value={price}
                onChange={onChangePrice} 
              />
          
              <input
                type="text"
                placeholder="Count In Stock"
                className="form-control"
                required
                value={countInStock}
                onChange={onChangeCountInStock} 
              />
          
              <input
                type="text"
                placeholder="Image Url"
                className="form-control"
                required
                value={imageurl}
                onChange={onChangeImage} 
              />
          
              <input
                type="text"
                placeholder="Description"
                className="form-control"
                required
                value={description}
                onChange={onChangeDescription} 
              />
          
              <input
                type="text"
                placeholder="category"
                className="form-control"
                required
                value={category}
                onChange={onChangeCategory} 
              />

              
              <div className="pull-right">
                <button
                  type="submit"
                  className="btn mt-3"
                >
                  EDIT PRODUCT
                </button>
              </div>

            </form> 
             
            
          </div>
      }
    </div>
    
  )
  
  function editCurrentProdut  (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const currentProduct = {
      _id: product._id,
      name: name,
      price: price,
      countInStock: countInStock,
      image: imageurl,
      description: description,
      category: category
    }
    console.log(product);
    dispatch(editProduct(currentProduct));
  }
  
  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);  
  }
  
  function onChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
    setPrice(Number(e.target.value));  
  }
  
  function onChangeCountInStock(e: React.ChangeEvent<HTMLInputElement>) {
    setCountInStock(Number(e.target.value));  
  }
  
  function onChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    setImageUrl(e.target.value);  
  }
  
  function onChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);  
  }
  
  function onChangeCategory(e: React.ChangeEvent<HTMLInputElement>) {
    setCategory(e.target.value);  
  }
}

export default EditProduct;
