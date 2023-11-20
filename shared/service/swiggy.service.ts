import { CORS_BYPASS_URL } from "@/core/utils/common";
import axios from "axios";

const getHomePageData = (lat: string, lng: string) => {
  const homePageListingApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
  return axios.get(homePageListingApi);
};

const getCollections = (collectionId: string, lat: string, lng: string) => {
  const collectionApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collectionId}&tags=layout_ux4&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
  return axios.get(collectionApi);
};

const getRestaurantMenu = (restaurantId: string, lat: string, lng: string) => {
  const restaurantMenuApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;
  return axios.get(restaurantMenuApi);
};

const getSupportIssues = () => {
  const supportIssuesApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/support?`;
  return axios.get(supportIssuesApi);
};

const getIssueRelatedFaqs = (issueType: string) => {
  const issueRelatedFaqsApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/support/issues/${issueType}?`;
  return axios.get(issueRelatedFaqsApi);
};

const update = (updateObj: any) => {
  const updateApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/list/update`;
  return axios.post(updateApi, updateObj);
};

const getSuggestions = (searchText: string, lat: string, lng: string) => {
  const searchSuggestionApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=null`;
  return axios.get(searchSuggestionApi);
};

const getSearchResults = (searchText: string, lat: string, lng: string) => {
  const searchResultsApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=null&submitAction=SUGGESTION`;
  return axios.get(searchResultsApi);
};

const changeSearchResults = (
  searchText: string,
  lat: string,
  lng: string,
  selectedTab: string
) => {
  const searchResultsApi = `${CORS_BYPASS_URL}https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=null&submitAction=SUGGESTION&selectedPLTab=${selectedTab}`;
  return axios.get(searchResultsApi);
};

const getOrderDetail = (values: { email: string; orderId: string }) => {
  const orderDetailApi = `http://localhost:3000/api/getOrderDetail`;
  return axios.post(orderDetailApi, values);
};

const swiggyServices = {
  getHomePageData,
  getCollections,
  getRestaurantMenu,
  getSupportIssues,
  getIssueRelatedFaqs,
  update,
  getSuggestions,
  getSearchResults,
  changeSearchResults,
  getOrderDetail
};

export default swiggyServices;
