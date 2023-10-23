import { configureStore } from "@reduxjs/toolkit";
import addToCartReducer from "@/features/addToCart/addToCart";
import locationReducer from "@/features/location/location";
import { loadingReducer } from "@/features/loading/loading";

const rootReducer = {
  cart: addToCartReducer,
  location: locationReducer,
  loading: loadingReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
