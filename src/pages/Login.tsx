import React, {useState, useEffect} from "react";
import useTogglePassword from "../hooks/useTogglePassword";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {ICredentials} from "../interfaces";
import {setCredentials} from "../auth/authSlice";

const Login: React.FC = () => {
  const [passwordInputType, ToggleIcon] = useTogglePassword();
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "valid_token") {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    const creds: ICredentials = {
      email: email,
      password: password,
    };
    dispatch(setCredentials(creds));
    if(token !== "valid_token"){
      setError("Invalid Credentials")
    }
  };
  const handleChnage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setEmail(event.target.value);
    }
  };

  return (
    <>
      <div className="loginPage">
        <b>Email: root@gmail.com password: root</b>
        <form className="loginForm">
          <div>
            <input
              name="email"
              id="email"
              value={email}
              onChange={handleChnage}
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="passwordInput">
            <input
              name="password"
              id="password"
              value={password}
              onChange={handleChnage}
              type={passwordInputType}
              className="form-control"
              placeholder="Password"
              required
            />
            <span className="toggle-password-icon">{ToggleIcon}</span>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}>
            {" "}
            Login
          </button>
          {error && <b className="error-red">{error}</b>}
        </form>
      </div>
    </>
  );
};

export default Login;
