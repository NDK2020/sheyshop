import React, {useEffect, useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {updateUser} from "../redux/store/userSlice";


function ProfilePage() {
  const dispatch = useAppDispatch();
  const {user, status, error} = useAppSelector(state => state.user); 
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  
  useEffect(() => {
    
  },[])
  
  return (
    <div>

      <div className="row justify-content-center">

        <div className="col-md-5 card p-3" style={{marginTop: '150px'}}>
          <div>
            <h2 className="text-center m-3">Update</h2>  
            {
              status == "loading" && <Loader />
            }
            {
              status == "failed" && <Error error={error} />
            }
            {
              status == "complete" && <Success success="Update successful, Please re-login" />
            }

            <form onSubmit={onClickUpdate}>
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
                placeholder="email"
                className="form-control"
                required
                value={email}
                onChange={onChangeEmail} 
              />

              <input
                type="password"
                placeholder="password"
                className="form-control"
                required
                value={password}
                onChange={onChangePassword} 
              />

              <input
                type="password"
                placeholder="confirmed password"
                className="form-control"
                required
                value={confirmedPassword}
                onChange={onChangeConfirmedPassword} 
              />

              <div className="pull-right">
                <button
                  type="submit"
                  className="btn mt-3"
                >
                  UPDATE  
                </button>
              </div>
            </form>

          </div>  
        </div>  

      </div>  

    </div>
  )
  
  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);  
  }

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);  
  }
  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);  
  }
  function onChangeConfirmedPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmedPassword(e.target.value);  
  }
  
  function onClickUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  
    const currentUser = {
      _id      : user._id,
      name     : name,
      email    : email,
      password : password
    }
    console.log(currentUser);
    
    if (password == confirmedPassword) {
      dispatch(updateUser(currentUser));  
    } else {
      alert('Passwords not matched')
    }
  }
}

export default ProfilePage;
