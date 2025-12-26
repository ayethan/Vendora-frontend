import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice.ts'
import locationReducer from './locationSlice.ts'
import { loadLocation, saveLocation } from './storage.js'

const persistedLocation = loadLocation();

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
  preloadedState: {
    location: persistedLocation
  }
})

store.subscribe(() => {
  saveLocation(store.getState().location);
});


export default store;