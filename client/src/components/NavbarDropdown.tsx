import react from "react";
import {useAppDispatch} from "../redux/hook";
import {logout} from "../redux/store/userSlice";
import {ImProfile} from "react-icons/im";
import {BiLogOut} from "react-icons/bi";

function NavbarDropdown(props: any) {
  const dispatch = useAppDispatch();
  const {currentUser} = props;
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <ImProfile style={{color:"white"}} className="mx-2"/>
        {currentUser.name}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a className="dropdown-item" href="/profile">Profile</a></li>
        <li><a className="dropdown-item" href="/orders">Orders</a></li>
        <li><a className="dropdown-item" onClick={onClickLogout} >
          Logout
          <BiLogOut className="mx-2"/>
        </a></li>
        {
          currentUser && currentUser.isAdmin && (
            <li><a className="dropdown-item" href="/admin">Admin Panel</a></li>
          )
        }
      </ul>
    </div>
  )
  function onClickLogout (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    dispatch(logout());
  }
}

export default NavbarDropdown;
