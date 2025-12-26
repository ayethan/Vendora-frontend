import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  latitude: string | null;
  longitude: string | null;
  address: string | null;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  address: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<{ lat: string; lon: string; display_name: string }>) => {
      state.latitude = action.payload.lat;
      state.longitude = action.payload.lon;
      state.address = action.payload.display_name;
    },
    clearLocation: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.address = null;
    }
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;

export default locationSlice.reducer;
