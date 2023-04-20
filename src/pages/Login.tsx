import React, {useState, useEffect} from "react";
import useTogglePassword from "../hooks/useTogglePassword";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {ICredentials} from "../interfaces";
import {setCredentials} from "../auth/authSlice";
import ErrorAlert from "../components/ErrorAlert";

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
    if (token !== "valid_token") {
      setError("Invalid Credentials");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setError("");
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else {
      setEmail(event.target.value);
    }
  };

  return (
    <>
      <div className="loginPage">
        <h3 className="text-white">Email: root@gmail.com password: root</h3>
        <form className="loginForm shadow">
          <div>
            <input
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
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
              onChange={handleChange}
              type={passwordInputType}
              className="form-control"
              placeholder="Password"
              required
            />
            {password && (
              <span className="toggle-password-icon">{ToggleIcon}</span>
            )}
          </div>
          <button
            type="submit"
            className="btn shadow btn-hover-shine btn-primary"
            onClick={handleSubmit}>
            {" "}
            Login
          </button>
        </form>
      </div>
      {error && (
        <ErrorAlert message={error} closeNotification={() => setError("")} />
      )}
    </>
  );
};

export default Login;
