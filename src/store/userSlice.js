import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user";
import axios from "axios";

const initialState = {
  user: null,
  cart: {
    items: [],
  },
  status: "idle",
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const data = await userService.getUserDetails();
    return data;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await userService.signOut();
  return null;
});

export const fetchCart = createAsyncThunk("user/fetchCart", async (_, { getState }) => {
  const token = getState().user.user?.token;
  if (token) {
    const response = await axios.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.cart;
  }
  return null;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      if (action.payload && action.payload.cart) {
        state.cart = action.payload.cart;
      }
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.error("fetchUserDetails rejected:", action.error.message);
        state.user = null; // Clear user on rejection
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.cart = { items: [] };
        state.status = "succeeded"; // Changed from "idle" to "succeeded"
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, setCart } = userSlice.actions;

export default userSlice.reducer;