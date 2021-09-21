import  React, {useEffect} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import {AiTwotoneEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import EditProduct from "../pages/EditProduct";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {deleteProduct, getAllProducts} from "../redux/store/productSlice";
import Error from "./Error";
import Loader from "./Loader";
import {numberWithCommas} from "../common/UtilityFunctions";

function ProductsList() {

  const dispatch = useAppDispatch();
  const productData = useAppSelector(state => state.productData);
  const {allProducts, status} = productData

  useEffect(() => {
    dispatch(getAllProducts());  
  },[])

  return (
    <div className="table-responsive">
      <h2 className="text-center">Products List</h2>

      <table className="table table-bordered text-center">

        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Stock</td>
            <td>Id</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>

          {
            status == "loading" && <Loader />
          }
          {
            status == "failed" && <Error error="Something went wrong" />
          }
          {
            Object.keys(allProducts).length > 0 && allProducts.map((product: any) => {
              return (
                <tr>
                  <td>{product.name}</td>
                  <td>{numberWithCommas(product.price)}</td>
                  <td>{product.countInStock}</td>
                  <td>{product._id}</td>
                  <td >

                    <FaRegTrashAlt
                      id={product._id}
                      className="m-1"
                      onClick={onClickDeleteProduct}/>
                    <Link to={`/admin/editproduct/${product._id}`}>
                      <AiTwotoneEdit className="m-1"/>
                    </Link>
                  </td>
                </tr>
              )
            })  
          }
        </tbody>

      </table>
    </div>
  )  

  function onClickDeleteProduct(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const productid = e.currentTarget.id;
    dispatch(deleteProduct(productid));    
  }
}

export default ProductsList;
