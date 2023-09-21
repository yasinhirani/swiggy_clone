import Image from "next/image";
import React from "react";
import SearchResultRestaurantCard from "./SearchResultRestaurantCard";
import SearchResultDishCard from "./SearchResultDishCard";

function SearchResults({ tabs, list }: any) {
  return (
    <div className="mt-5">
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
        {list.hasOwnProperty("RESTAURANT") && (
          <SearchResultRestaurantCard
            maxWidth="max-w-max"
            restaurantInfo={list.RESTAURANT.cards[0].card.card.info}
          />
        )}
        {list.hasOwnProperty("RESTAURANT") && (
          <p className="mt-10 mb-5 font-bold text-lg">More results like this</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {list.hasOwnProperty("RESTAURANT") &&
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
          {list.hasOwnProperty("DISH") &&
            list.DISH.cards
              .slice(1, list.DISH.cards.length - 1)
              .map((card: any) => {
                return (
                  <SearchResultDishCard
                    key={Math.random()}
                    dishInfo={card.card.card}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
