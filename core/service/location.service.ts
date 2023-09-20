import axios from "axios";
import { CORS_BYPASS_URL } from "../utils/common";

const getLocation = (locationName: string) => {
  const locationApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`;
  return axios.get(locationApi);
};

const getLocationInfo = (placeId: string) => {
  const locationInfoApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`;
  return axios.get(locationInfoApi);
}

const locationService = { getLocation, getLocationInfo };
export default locationService;
