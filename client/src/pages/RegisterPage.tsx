import React, {useState} from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import {useAppDispatch, useAppSelector} from "../redux/hook";
import {register} from "../redux/store/userSlice";
import {BsFillPersonPlusFill} from "react-icons/bs";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const {status, error} = useAppSelector(state => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  return (
    <div>

      <div className="row justify-content-center mx-2">

        <div
          className="col-md-5 card p-3 shadow p-3 mb-5 rounded"
          style={{marginTop: '150px'}}>
          <div>
            <h2 className="text-center m-3">
              Register
              <BsFillPersonPlusFill size="27px" className="mx-3" />
            </h2>  
            {
              status == "loading" && <Loader />
            }
            {
              status == "failed" && <Error error={error} />
            }
            {
              status == "complete" && <Success success="registration successful" />
            }

            <form onSubmit={onClickRegister}>
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
                  REGISTER  
                </button>
              </div>
            </form>
            

          </div>  
            <a href="/login" className="m-3 text-center" style={{color: "black"}}>
              Click Here To Login
            </a>
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

  async function onClickRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const user = {
      name: name,
      email: email,
      password: password
    }
    if (password == confirmedPassword) {
      await dispatch(register(user));  
    } else {
      alert('Passwords not matched')
    }
  }
}

export default RegisterPage;
