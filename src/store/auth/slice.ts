import type { IUser } from "@/type/IUser";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  loginAsync,
  registerAsync,
  updateProfileAsync,
  sendPasswordLinkAsync,
  resetPasswordAsync,
} from "./async";

export interface IAuthState {
  token: string;
  user?: IUser;
  loading: boolean;
  error: string | null;
}

const initalState: IAuthState = {
  token: Cookies.get("token") || "",
  user: Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : undefined,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalState,
  reducers: {
    LOGOUT(state) {
      state.token = "";
      state.user = undefined;
      state.error = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
    SET_TOKEN(state, action) {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
        Cookies.set("token", action.payload.token, { expires: 1 });
        Cookies.set("user", JSON.stringify(action.payload.user), {
          expires: 1,
        });
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "Login failed. Please check your email and password.";
      });

    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        Cookies.set("user", JSON.stringify(action.payload.user), {
          expires: 1,
        });
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update profile failed";
      });

    builder
      .addCase(sendPasswordLinkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPasswordLinkAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendPasswordLinkAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to send reset password link";
      });

    builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to reset password";
      });
  },
});

export const { LOGOUT, SET_TOKEN } = authSlice.actions;
export default authSlice.reducer;
