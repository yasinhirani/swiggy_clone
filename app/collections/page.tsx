"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "@/components/RestaurantCard";
import { IState } from "@/shared/model/state.mode";
import swiggyServices from "@/shared/service/swiggy.service";

function Collections() {
  const searchParams = useSearchParams();
  const collectionId = searchParams?.get("collectionId");

  const locationState = useSelector((state: IState) => state.location);

  const [collectionData, setCollectionData] = useState<any>([]);
  const [restaurantsList, setRestaurantsList] = useState<any>([]);

  useEffect(() => {
    if (collectionId && locationState) {
      swiggyServices
        .getCollections(
          collectionId,
          locationState.geometry.location.lat.toString(),
          locationState.geometry.location.lng.toString()
        )
        .then((res) => {
          if (res.data.data) {
            setCollectionData(res.data.data.cards[0].card.card);
            setRestaurantsList(
              res.data.data.cards.slice(2, res.data.data.cards.length)
            );
          }
        });
    }
  }, [collectionId, locationState]);
  return (
    <div className="mt-20 flex-grow flex flex-col">
      {collectionData && restaurantsList.length > 0 && (
        <div className="w-full max-w-[76rem] mx-auto flex-grow px-6 py-10 mb-16 lg:mb-0">
          {/* Start Heading */}
          <div className="mb-6">
            <h2 className="font-semibold text-5xl mb-2 text-gray-700">
              {collectionData.title}
            </h2>
            <p className="font-light text-lg tracking-wide">
              {collectionData.description}
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
                  <RestaurantCard
                    key={data.card.card.info.id}
                    data={data.card.card}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Collections;
