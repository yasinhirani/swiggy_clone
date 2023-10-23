import { ILocationInfo } from "@/core/model/location.model";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ILocationInfo = {
  formatted_address: "",
  address_components: [],
  place_id: "",
  geometry: {
    location: {
      lat: 0,
      lng: 0,
    },
    location_type: "",
    viewport: {
      northeast: {
        lat: 0,
        lng: 0,
      },
      southwest: {
        lat: 0,
        lng: 0,
      },
    },
  },
  types: [],
  place_type: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      const copyState = state;
      copyState.formatted_address = action.payload.formatted_address;
      copyState.address_components = action.payload.address_components;
      copyState.place_id = action.payload.place_id;
      copyState.place_type = action.payload.place_type;
      copyState.types = action.payload.types;
      copyState.geometry = action.payload.geometry;
      state = copyState;
    },
  },
});

export const { setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
