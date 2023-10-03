import React, { useContext, useEffect, useState } from "react";
import SearchResultRestaurantCard from "./SearchResultRestaurantCard";
import SearchResultDishCard from "./SearchResultDishCard";
import { CartContext, CartTotalContext } from "@/core/context";
import cartTotal from "@/shared/utils/cartTotal";
import { searchResultType } from "@/core/utils/common";

function SearchResults({ tabs, list }: any) {
  const { CartData, SetCartData } = useContext(CartContext);
  const { setCartTotal } = useContext(CartTotalContext);
  const [cartItem, setCartItem] = useState<ICartItems | null>(null);
  const [restaurantDataState, setRestaurantDataState] =
    useState<ICartRestaurantDetails | null>(null);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const resetCartForNewOrder = () => {
    SetCartData({ Items: [], RestaurantDetails: null });
    if (cartItem && restaurantDataState) {
      console.log(cartItem);
      addToCart(
        cartItem.ItemId,
        cartItem.IsVeg,
        cartItem.ItemName,
        cartItem.Price,
        true,
        restaurantDataState
      );
    }
    setInfoModalVisible(false);
  };

  const addToCart = (
    itemId: string,
    isVeg: boolean,
    itemName: string,
    price: number,
    isAfreshStart: boolean,
    restaurantData: ICartRestaurantDetails
  ) => {
    let copyCart = [...CartData.Items];
    let itemToAdd: ICartItems = {
      ItemId: itemId,
      IsVeg: isVeg,
      ItemName: itemName,
      Price: price,
      Quantity: 1,
      Total: price,
    };
    setRestaurantDataState(restaurantData);
    setCartItem(itemToAdd);
    // Start Add initial Product and restaurant details to cart
    if (copyCart.length === 0 || isAfreshStart) {
      const restaurantDetails: ICartRestaurantDetails = {
        RestaurantId: restaurantData.RestaurantId || "",
        RestaurantImage: restaurantData.RestaurantImage,
        RestaurantLocation: restaurantData.RestaurantLocation,
        RestaurantName: restaurantData.RestaurantName,
      };
      copyCart = [];
      copyCart.push(itemToAdd);
      SetCartData({
        RestaurantDetails: restaurantDetails,
        Items: copyCart,
      });
      console.log("run");
      return;
    }
    // End Add initial Product and restaurant details to cart
    // Start check if restaurant is same or different
    if (
      CartData.RestaurantDetails?.RestaurantId !== restaurantData?.RestaurantId
    ) {
      setInfoModalVisible(true);
      return;
    }
    // End check if restaurant is same or different
    // Start add/update to cart if same restaurant
    const itemIndex = copyCart.findIndex((item) => item.ItemId === itemId);
    if (itemIndex === -1) {
      copyCart.push(itemToAdd);
      SetCartData({
        Items: copyCart,
        RestaurantDetails: CartData.RestaurantDetails,
      });
    } else {
      copyCart[itemIndex].Quantity = copyCart[itemIndex].Quantity + 1;
      copyCart[itemIndex].Total =
        copyCart[itemIndex].Quantity * copyCart[itemIndex].Price;
      SetCartData({
        Items: copyCart,
        RestaurantDetails: CartData.RestaurantDetails,
      });
    }
    // End add/update to cart if same restaurant
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    localStorage.setItem("cartData", JSON.stringify(CartData));
    setCartTotal(cartTotal(CartData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartData]);
  return (
    <div className="mt-5 relative">
      <div className="flex items-center space-x-3 mb-5">
        {tabs.length > 0 &&
          tabs.map((tab: any) => {
            return (
              <button
                key={Math.random()}
                className={`border ${
                  tab.hasOwnProperty("selected") && tab.selected
                    ? "bg-[#1B1E24] border-[#1B1E24] text-white"
                    : "border-gray-300 bg-white"
                } rounded-3xl px-3 py-2 cursor-default`}
              >
                {tab.title}
              </button>
            );
          })}
      </div>
      <div className="bg-gray-100 px-4 py-6">
        {list.hasOwnProperty(searchResultType.RESTAURANT) && (
          <SearchResultRestaurantCard
            maxWidth="max-w-max"
            restaurantInfo={list.RESTAURANT.cards[0].card.card.info}
          />
        )}
        {list.hasOwnProperty(searchResultType.RESTAURANT) && (
          <p className="mt-10 mb-5 font-bold text-lg">More results like this</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {list.hasOwnProperty(searchResultType.RESTAURANT) &&
            list.RESTAURANT.cards[1].card.card.restaurants.map(
              (restaurant: any) => {
                return (
                  <SearchResultRestaurantCard
                    key={Math.random()}
                    restaurantInfo={restaurant.info}
                  />
                );
              }
            )}
          {list.hasOwnProperty(searchResultType.DISH) &&
            list.DISH.cards
              .slice(1, list.DISH.cards.length - 1)
              .map((card: any) => {
                return (
                  <SearchResultDishCard
                    key={Math.random()}
                    dishInfo={card.card.card}
                    addToCart={addToCart}
                  />
                );
              })}
        </div>
      </div>
      {/* Start Modal for info for item already in cart */}
      <div
        className={`fixed ${
          infoModalVisible ? "bottom-8" : "-bottom-full"
        } left-1/2 transform -translate-x-1/2 bg-white p-6 z-30 w-full max-w-[500px] min-w-[300px] info-modal`}
      >
        <h2 className="font-bold text-2xl text-gray-700">
          Items already in cart
        </h2>
        <p className="font-normal text-sm text-gray-500 mt-2">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex items-center space-x-5 mt-5">
          <button
            type="button"
            onClick={() => setInfoModalVisible(false)}
            className="w-full border border-[#60b246] text-[#60b246] px-4 py-2 uppercase"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => resetCartForNewOrder()}
            className="w-full border border-[#60b246] bg-[#60b246] text-white px-4 py-2 uppercase"
          >
            yes, start afresh
          </button>
        </div>
      </div>
      {/* End Modal for info for item already in cart */}
    </div>
  );
}

export default SearchResults;
