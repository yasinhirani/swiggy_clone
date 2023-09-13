import axios from "axios";

const getLocation = (locationName: string) => {
  const locationApi = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${locationName}&types=`;
  return axios.get(locationApi);
};

const getLocationInfo = (placeId: string) => {
  const locationInfoApi = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${placeId}`;
  return axios.get(locationInfoApi);
}

const locationService = { getLocation, getLocationInfo };
export default locationService;
