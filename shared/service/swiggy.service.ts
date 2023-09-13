import axios from "axios";

const getHomePageData = (lat: string, lng: string) => {
  const homePageListingApi = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
  return axios.get(homePageListingApi);
};

const getCollections = (collectionId: string, lat: string, lng: string) => {
  const collectionApi = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&tags=layout_ux4&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  return axios.get(collectionApi);
};

const getRestaurantMenu = (restaurantId: string, lat: string, lng: string) => {
  const restaurantMenuApi = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;
  return axios.get(restaurantMenuApi);
};

const swiggyServices = { getHomePageData, getCollections, getRestaurantMenu };

export default swiggyServices;
