import { api } from "@/lib/api";
import type { IProducts } from "@/type/IProducts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const res = await api.get(`/api/product`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data: IProducts, thunkAPI) => {
    try {
      const res = await api.post(`/api/product`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data: { id: number; data: Partial<IProducts> }, thunkAPI) => {
    try {
      const res = await api.put(`/api/product/${data.id}`, data.data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update product");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/api/product/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
