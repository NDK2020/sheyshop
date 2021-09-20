import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import OrdersList from "../components/OrdersList";
import ProductsList from "../components/ProductsList";
import UsersList from "../components/UsersList";
import AddProductPage from "./AddProductPage";
import EditProduct from "./EditProduct";

function AdminPage() {

  return (
    <div>

      <div className="row justify-content-center mt-2">

        <div className="col-md-10">

          <h2 className="text-center">Admin Panel</h2>
          <ul className="admin p-2 text-center">
            <li>
              <Link to="/admin/userslist" style={{color: "black"}}>
                Users List
              </Link>
            </li>  

            <li>
              <Link to="/admin/productslist" style={{color: "black"}}>
                Products List  
              </Link>
            </li>  

            <li>
              <Link to="/admin/addnewproduct" style={{color: "black"}}>
                Add New Product
              </Link>  
            </li>  

            <li>
              <Link to="/admin/orderslist" style={{color: "black"}}>
                Orders List
              </Link>
            </li>  
          </ul>

          <Switch>
            <Route path='/admin/userslist' component={UsersList} />
            <Route path='/admin/productslist' component={ProductsList} />
            <Route path='/admin/addnewproduct' component={AddProductPage}/>
            <Route path='/admin/orderslist' component={OrdersList} />
            <Route path='/admin/editproduct/:productid' component={EditProduct} />
            
          </Switch>

        </div>

      </div>

    </div>
  );
}

export default AdminPage;
