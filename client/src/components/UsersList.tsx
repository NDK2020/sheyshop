import  React, {useEffect} from "react";
import {FaRegTrashAlt} from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {deleteUser, getAllUsers} from "../redux/store/userSlice";
import Error from "./Error";
import Loader from "./Loader";
import Success from "./Success";

function UsersList() {

  const dispatch = useAppDispatch();
  const {users, status, error} = useAppSelector(state => state.user);
  
  useEffect(() => {
    dispatch(getAllUsers());  
  }, [])

  return (
    <div className="table-responsive">
      
      <h2 className="text-center">UsersList</h2>


      <table className="table table-bordered text-center">
        
        <thead>
          <tr>
            <td>User Id</td>
            <td>Name</td>
            <td>Email</td>
            <td >Delete</td>
          </tr>
        </thead>

        <tbody>
          
          {
            status == "loading" && <Loader />
          }
          {
            status == "failed" && <Error error={error} />
          }
          {
            Object.keys(users).length > 0 && users.map((user: any) => {
              return (
                <tr>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td >
                    
                    <FaRegTrashAlt id={user._id}  onClick={onClickDeleteUser}/>
                    
                  </td>
                </tr>
              )
          })  
          }
        </tbody>

      </table>

    </div>
  )  
  function onClickDeleteUser(e: React.MouseEvent<SVGElement, MouseEvent>) {
    const userid = e.currentTarget.id;
    dispatch(deleteUser(userid));    
  }
}

export default UsersList;
