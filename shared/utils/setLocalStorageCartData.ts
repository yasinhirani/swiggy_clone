function setLocalStorageCartData() {
  if (typeof window !== "undefined" && window.localStorage) {
    // Return an object with the same API as localStorage
    return {
      getItem(key: string) {
        return JSON.parse(localStorage.getItem(key) as string);
      }
    };
  }
  // Return an object with no-op methods
  return { getItem() {} };
}
export default setLocalStorageCartData;
