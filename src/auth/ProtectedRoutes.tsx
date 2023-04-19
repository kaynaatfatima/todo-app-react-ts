import React from "react";
import {Outlet, Navigate} from "react-router-dom";
import {useAppSelector} from "../app/hooks";

function ProtectedRoutes(): JSX.Element {
  const token = useAppSelector((state) => state.auth.token);
  return token === "valid_token" ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
