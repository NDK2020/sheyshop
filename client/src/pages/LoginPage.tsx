import React, {useEffect, useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {login} from "../redux/store/userSlice";
import {BiLogIn} from "react-icons/bi";

function LoginPage() {

  const dispatch = useAppDispatch();
  const {status} = useAppSelector(state => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href="/";
    }  
  },[])

  return (
    <div>

      <div className="row justify-content-center mx-2">

        <div
          className="col-md-4 card p-3 shadow p-3 mb-5 rounded"
          style={{marginTop: '150px'}}> 
          <h2 className="text-center m-3">
            Login
            <BiLogIn size="26px" className="mx-2"/> 
          </h2>  
          {
            status == "failed" && (<Error error="Invalid Credentials" />)
          }
          {
            status == "loadint" && (<Loader />)
          }

          <form onSubmit={onClickLogin}>
            <input
              type="text"
              placeholder="email"
              className="form-control"
              required
              value={email}
              onChange={onChangeEmail} />

            <input
              type="password"
              placeholder="password"
              className="form-control"
              required
              value={password}
              onChange={onChangePassword} />

            <div className="pull-right">

              <button
                type="submit"
                className="btn mt-3">
                LOGIN
              </button>

            </div>

          </form>
          
          <a href="/register" className="text-center m-3" style={{color: "black"}}>
            Click Here To Register
          </a>
          
        </div>  

      </div>  

    </div>  
  )

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function onClickLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    }
    dispatch(login(user));
  }
}

export default LoginPage;
