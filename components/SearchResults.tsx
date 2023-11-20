import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchResultType } from "@/core/utils/common";
import { addToCart } from "@/features/addToCart/addToCart";
import { IState } from "@/shared/model/state.mode";
import SearchResultDishCard from "./SearchResultDishCard";
import SearchResultRestaurantCard from "./SearchResultRestaurantCard";

function SearchResults({ tabs, list }: any) {
  const dispatch = useDispatch();
  const cartRestaurantState = useSelector(
    (state: IState) => state.cart.RestaurantDetails
  );

  const [cartItem, setCartItem] = useState<ICartItems | null>(null);
  const [restaurantDataState, setRestaurantDataState] =
    useState<ICartRestaurantDetails | null>(null);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const handleAddToCart = (
    itemId: string,
    isVeg: boolean,
    itemName: string,
    price: number,
    isAfreshStart: boolean,
    restaurantData: ICartRestaurantDetails
  ) => {
    const RestaurantDetail: ICartRestaurantDetails = restaurantData;

    const itemToAdd: ICartItems = {
      ItemId: itemId,
      IsVeg: isVeg,
      ItemName: itemName,
      Price: price,
      Quantity: 1,
      Total: price
    };

    setCartItem(itemToAdd);
    setRestaurantDataState(RestaurantDetail);

    if (
      cartRestaurantState !== null &&
      restaurantData.RestaurantId !== cartRestaurantState?.RestaurantId &&
      !isAfreshStart
    ) {
      setInfoModalVisible(true);
      return;
    }

    dispatch(
      addToCart({
        updateDetails: {
          RestaurantDetail,
          Item: itemToAdd
        },
        isAfreshStart
      })
    );
  };

  const resetCartForNewOrder = () => {
    if (cartItem && restaurantDataState) {
      handleAddToCart(
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

  return (
    <div className="mt-5 relative">
      <div className="flex items-center space-x-3 mb-5">
        {tabs.length > 0 &&
          tabs.map((tab: any) => {
            return (
              <button
                type="button"
                key={tab.id}
                className={`border ${
                  Object.prototype.hasOwnProperty.call(tab, "selected") &&
                  tab.selected
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
        {Object.prototype.hasOwnProperty.call(
          list,
          SearchResultType.RESTAURANT
        ) && (
          <SearchResultRestaurantCard
            maxWidth="max-w-max"
            restaurantInfo={list.RESTAURANT.cards[0].card.card.info}
          />
        )}
        {Object.prototype.hasOwnProperty.call(
          list,
          SearchResultType.RESTAURANT
        ) && (
          <p className="mt-10 mb-5 font-bold text-lg">More results like this</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Object.prototype.hasOwnProperty.call(
            list,
            SearchResultType.RESTAURANT
          ) &&
            list.RESTAURANT.cards[1].card.card.restaurants.map(
              (restaurant: any) => {
                return (
                  <SearchResultRestaurantCard
                    key={restaurant.info.id}
                    maxWidth=""
                    restaurantInfo={restaurant.info}
                  />
                );
              }
            )}
          {Object.prototype.hasOwnProperty.call(list, SearchResultType.DISH) &&
            list.DISH.cards
              .slice(1, list.DISH.cards.length - 1)
              .map((card: any) => {
                return (
                  <SearchResultDishCard
                    key={card.card.card.info.id}
                    dishInfo={card.card.card}
                    addToCart={handleAddToCart}
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
