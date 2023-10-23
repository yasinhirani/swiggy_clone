import { createSlice } from "@reduxjs/toolkit";

const initialState: ICartData = {
  RestaurantDetails: null,
  Items: [],
};

const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let copyState = [...state.Items];
      if (state.Items.length === 0 || action.payload.isAfreshStart) {
        state.RestaurantDetails = action.payload.updateDetails.RestaurantDetail;
        copyState = [];
        copyState.push(action.payload.updateDetails.Item);
        state.Items = copyState;
      } else {
        const existingItemIndex = copyState.findIndex(
          (item) => item.ItemId === action.payload.updateDetails.Item.ItemId
        );
        if (existingItemIndex === -1) {
          copyState.push(action.payload.updateDetails.Item);
          state.Items = copyState;
        } else {
          copyState[existingItemIndex].Quantity += 1;
          copyState[existingItemIndex].Total =
            copyState[existingItemIndex].Price *
            copyState[existingItemIndex].Quantity;
          state.Items = copyState;
        }
      }
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    updateCart: (state, action) => {
      let copyState = [...state.Items];
      const existingItemIndex = copyState.findIndex(
        (item) => item.ItemId === action.payload.updateDetails.ItemId
      );
      if (existingItemIndex !== -1) {
        if (action.payload.updateType === "add") {
          copyState[existingItemIndex].Quantity += 1;
          copyState[existingItemIndex].Total =
            copyState[existingItemIndex].Price *
            copyState[existingItemIndex].Quantity;
          state.Items = copyState;
        } else {
          if (copyState[existingItemIndex].Quantity === 1) {
            copyState.splice(existingItemIndex, 1);
            state.Items = copyState;
          } else {
            copyState[existingItemIndex].Quantity -= 1;
            copyState[existingItemIndex].Total =
              copyState[existingItemIndex].Price *
              copyState[existingItemIndex].Quantity;
            state.Items = copyState;
          }
        }
        if (copyState.length === 0) {
          state = {
            RestaurantDetails: null,
            Items: [],
          };
        }
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },
    resetCart: (state) => {
      state.RestaurantDetails = null;
      state.Items = [];
      localStorage.setItem("cartData", JSON.stringify(state));
    },
    setCartFromLocalStorage: (state, action) => {
      const copyState = state;
      copyState.RestaurantDetails = action.payload.RestaurantDetails;
      copyState.Items = [...action.payload.Items];
      state = copyState;
    },
  },
});

export const { addToCart, updateCart, resetCart, setCartFromLocalStorage } =
  addToCartSlice.actions;

export default addToCartSlice.reducer;
