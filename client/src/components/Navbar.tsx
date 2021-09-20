import react from "react";
import {FaShoppingCart} from "react-icons/fa"
import {Link} from "react-router-dom";
import {useAppSelector} from "../redux/hook";
import NavbarDropdown from "./NavbarDropdown";
import {GiHamburgerMenu} from "react-icons/gi";

function Navbar() {

  const cartItems = useAppSelector (state => state.cartData.cartItems);  
  const currentUser =  JSON.parse(localStorage.getItem("currentUser") || "{}");  

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">

      <a className="navbar-brand" href="/">
        SHEY SHOP
      </a>

      <button
        className="navbar-toggler pull-right"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
      <span className="navbar-toggler-icon">
        <GiHamburgerMenu style={{color: "white"}} />
      </span>
    </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavDropdown" 
      >

        <ul className="navbar-nav pull-right">
          
          {
            Object.keys(currentUser).length 
              ? (
                <NavbarDropdown currentUser={currentUser}/> 
              ) : (
                <li className="nav-item"> 
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )
          }

          <li className="nav-item text-center"> 
            <a href="/cart" className="nav-link ">
              <FaShoppingCart />
              {cartItems!.length}
            </a>
          </li>
          
        </ul>

      </div>

      </div>
    </nav>
  )
}

export default Navbar;
