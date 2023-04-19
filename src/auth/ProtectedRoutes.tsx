import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {selectCurrentToken} from "./authSlice";
import {useSelector} from "react-redux";

function ProtectedRoutes(): JSX.Element {
  const token = useSelector(selectCurrentToken);
  return token === "valid_token" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
