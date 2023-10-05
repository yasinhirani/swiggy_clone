"use client";
import RestaurantCard from "@/components/RestaurantCard";
import { LocationContext } from "@/core/context";
import swiggyServices from "@/shared/service/swiggy.service";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";

function Collections() {
  const { locationInfo } = useContext(LocationContext);
  const searchParams = useSearchParams();
  const collectionId = searchParams?.get("collectionId");

  const [collectionData, setCollectionData] = useState<any>([]);
  const [restaurantsList, setRestaurantsList] = useState<any>([]);

  useEffect(() => {
    if (collectionId && locationInfo) {
      swiggyServices
        .getCollections(
          collectionId,
          locationInfo.geometry.location.lat.toString(),
          locationInfo.geometry.location.lng.toString()
        )
        .then((res) => {
          if (res.data.data) {
            setCollectionData(res.data.data);
            setRestaurantsList(
              res.data.data.cards.slice(2, res.data.data.cards.length)
            );
          }
        });
    }
  }, [collectionId, locationInfo]);
  return (
    <div className="mt-20 flex-grow flex flex-col">
      {collectionData && restaurantsList.length > 0 && (
        <div className="w-full max-w-[76rem] mx-auto flex-grow px-6 py-10 mb-16 lg:mb-0">
          {/* Start Heading */}
          <div className="mb-6">
            <h2 className="font-semibold text-5xl mb-2 text-gray-700">
              {collectionData.cards[0].card.card.title}
            </h2>
            <p className="font-light text-lg tracking-wide">
              {collectionData.cards[0].card.card.description}
            </p>
          </div>
          {/* End Heading */}
          <h4 className="font-extrabold text-2xl text-gray-800">
            Restaurants to explore
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {restaurantsList &&
              restaurantsList.map((data: any) => {
                return (
                  <RestaurantCard key={Math.random()} data={data.card.card} />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Collections;
