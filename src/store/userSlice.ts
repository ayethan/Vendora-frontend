import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import userService, { type User } from "../services/user.js";
import axios from "axios";

interface CartItem {
  productId: string;
  quantity: number;
}

interface Cart {
  items: CartItem[];
}

interface UserState {
  user: User | null;
  cart: Cart;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  cart: {
    items: [],
  },
  status: "idle",
  error: null,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getUserDetails();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  await userService.signOut();
  return null;
});

export const fetchCart = createAsyncThunk("user/fetchCart", async (_, { getState, rejectWithValue }) => {
  const state = getState() as { user: UserState };
  const token = state.user.user?.token;
  if (token) {
    try {
      const response = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.cart;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
  return null;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload && (action.payload as any).cart) {
        state.cart = (action.payload as any).cart;
      }
    },
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        console.error("fetchUserDetails rejected:", action.payload);
        state.user = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart | null>) => {
        if (action.payload) {
          state.cart = action.payload;
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.cart = { items: [] };
        state.status = "succeeded";
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails, setCart } = userSlice.actions;

export default userSlice.reducer;