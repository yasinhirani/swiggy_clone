import { SWIGGY_HOMEPAGE_LISTING_URL } from "@/core/utils/common";
import axios from "axios";

const getHomePageData = () => {
  return axios.get(SWIGGY_HOMEPAGE_LISTING_URL);
};
const swiggyServices = { getHomePageData };

export default swiggyServices;
