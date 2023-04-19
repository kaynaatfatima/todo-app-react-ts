import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICredentials } from "../interfaces";

interface AuthState {
  email?: string;
  token?: string;
}

const initialState: AuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<ICredentials>
    ) => {
      const {email, password} = action.payload;
      let accessToken: string | undefined;
      if (email.toLowerCase() === "root@gmail.com" && password === "root") {
        accessToken = "valid_token";
      }

      state.email = email;
      state.token = accessToken;
    },
    logOut: () => {
      // Reset the state to an empty object
      localStorage.clear();
      return initialState;
    },
  },
});

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;
