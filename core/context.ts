import { createContext } from "react";
import { ILocationContext } from "./model/location.model";
import { ILoadingContext } from "./model/loading.modal";

const LocationContext = createContext<ILocationContext>({
  locationInfo: null,
  setLocationInfo: () => {},
});

const CartContext = createContext<ICartContext>({
  CartData: {
    RestaurantDetails: null,
    Items: [],
  },
  SetCartData: () => {},
});

const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  setLoading: () => {},
});

export { LocationContext, CartContext, LoadingContext };
