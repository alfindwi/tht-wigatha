import { api } from "@/lib/api";
import type { IUser } from "@/type/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginAsync = createAsyncThunk<
  { token: string; user: IUser },
  { email: string; password: string },
  { rejectValue: string }
>("api/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/login", data);
    const { token, user } = res.data;

    Cookies.set("token", token);

    return { token, user };
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Login failed. Please check your email and password.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const registerAsync = createAsyncThunk<void, any>(
  "api/register",
  async (data, { rejectWithValue }) => {
    try {
      await api.post("/api/register", data);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfileAsync = createAsyncThunk<
  { user: IUser },
  Partial<IUser>,
  { rejectValue: string }
>("api/updateProfile", async (data, thunkAPI) => {
  try {
    const token = Cookies.get("token");
    if (!token) return thunkAPI.rejectWithValue("Unauthorized");

    const res = await api.put("/api/user/update", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { user: res.data.user };
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Update failed. Please try again.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const sendPasswordLinkAsync = createAsyncThunk<
  string,
  { email: string },
  { rejectValue: string }
>("api/sendPasswordLink", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/send-reset-password", data);

    return res.data.message;
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Failed to send reset password link.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const resetPasswordAsync = createAsyncThunk<
  string, 
  { token: string; password: string; password_confirmation: string },
  { rejectValue: string }
>("api/resetPassword", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/reset-password", data);

    return res.data.message;
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Failed to reset password.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
