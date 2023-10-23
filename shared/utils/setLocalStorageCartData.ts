function setLocalStorageCartData() {
  if (typeof window !== "undefined" && window.localStorage) {
    // Return an object with the same API as localStorage
    return {
      getItem: function (key: string) {
        return JSON.parse(localStorage.getItem(key) as string);
      },
    };
  } else {
    // Return an object with no-op methods
    return { getItem: function () {} };
  }
}
export default setLocalStorageCartData;
