import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  user: null,
  cart: {
    items: [],
  },
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      if (action.payload && action.payload.cart) {
        state.cart = action.payload.cart;
      }
    },
    logout: (state) => {
      state.user = null;
      state.cart = { items: [] };
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, logout, setCart } = userSlice.actions

export default userSlice.reducer