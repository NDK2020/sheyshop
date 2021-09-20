import  React, {useEffect, useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {addProduct} from "../redux/store/productSlice";

function AddProductPage() {
  const dispatch = useAppDispatch();
  const {addProductStatus} = useAppSelector(state => state.productData);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [countInStock, setCountInStock] = useState<number | undefined>();
  const [imageurl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    
  }, [])

  return (

    <div>

      <div className="row justify-content-center">

        <div className="col-md-8 text-center shadow p-3 mb-5 rounded card">
          
          {
            addProductStatus == "loading" && <Loader />
          }
          {
            addProductStatus == "failed" && <Error error="something went wrong..." />
          }
          
          {
            addProductStatus == "complete" && <Success success="Add New Product Successfully" />
          }
          <h2>Add Product</h2>  
        
        <form onSubmit={addNewProduct}>
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
                  ADD PRODUCT
                </button>
              </div>

            </form>
          </div>

      </div>

    </div>

  )  
  
  function addNewProduct  (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const product = {
      name: name,
      price: price,
      countInStock: countInStock,
      image: imageurl,
      description: description,
      category: category
    }
    console.log(product);
    dispatch(addProduct(product));
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


export default AddProductPage;

