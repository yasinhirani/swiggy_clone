import { createContext } from "react";
import { ILocationContext } from "./model/location.model";

const LocationContext = createContext<ILocationContext>({
  locationInfo: null,
  setLocationInfo: () => {},
});

export { LocationContext };
