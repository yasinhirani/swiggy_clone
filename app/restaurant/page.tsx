"use client";
import MenuList from "@/components/MenuList";
import { LocationContext } from "@/core/context";
import {
  SWIGGY_FSSAI_IMG_URL,
  SWIGGY_OFFER_GENERIC_LOGO_URL,
  SWIGGY_OFFER_LOGO_URL,
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";

function Restaurant() {
  const { locationInfo } = useContext(LocationContext);
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");

  const [restaurantData, setRestaurantData] = useState<Array<any>>([]);
  const [menuList, setMenuList] = useState<Array<any>>([]);

  const getRestaurantMenu = () => {
    if (restaurantId && locationInfo) {
      swiggyServices
        .getRestaurantMenu(
          restaurantId,
          locationInfo.geometry.location.lat.toString(),
          locationInfo.geometry.location.lng.toString()
        )
        .then((res) => {
          setRestaurantData(res.data.data.cards);
          // const menu =
          //   res.data.data.cards[2].groupCard.cardGroupMap.REGULAR.cards.splice(
          //     1,
          //     res.data.data.cards[2].groupCard.cardGroupMap.REGULAR.cards
          //       .length - 1
          //   );
          const menu =
            res.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
          setMenuList(menu);
        });
    }
  };

  useEffect(() => {
    getRestaurantMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, locationInfo]);
  return (
    <div className="mt-20 flex-grow px-6 py-10">
      {restaurantData.length > 0 && (
        <div className="w-full max-w-[50rem] mx-auto">
          <p className="font-normal text-xs text-gray-500">
            Home/ {locationInfo?.address_components[0].long_name} /{" "}
            {restaurantData[0].card.card.info.name}
          </p>
          {/* Start Restaurant details */}
          <div className="mt-10 flex justify-between items-center space-x-5">
            <div>
              <h2 className="font-bold text-2xl mb-1 text-gray-800">
                {restaurantData[0].card.card.info.name}
              </h2>
              <p className="font-normal text-sm text-gray-500">
                {restaurantData[0].card.card.info.cuisines.join(", ")}
              </p>
              <p className="font-normal text-sm text-gray-500">
                {restaurantData[0].card.card.info.areaName}
                {", "}
                {restaurantData[0].card.card.info.sla.lastMileTravelString}
              </p>
            </div>
            <div className="border border-gray-200 rounded-md p-2 flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <figure>
                  <Image
                    src="/images/rating_logo.svg"
                    alt="rating"
                    width={15}
                    height={15}
                  />
                </figure>
                <p className="font-bold text-sm text-green-600">
                  {restaurantData[0].card.card.info.avgRatingString}
                </p>
              </div>
              <div className="w-full h-0.5 bg-gray-200 my-2" />
              <p className="font-bold text-xs text-gray-400">
                {restaurantData[0].card.card.info.totalRatingsString}
              </p>
            </div>
          </div>
          {/* End Restaurant details */}
          {/* Start Distance text */}
          <p className="font-normal text-sm text-gray-500 mt-4">
            {restaurantData[0].card.card.info.feeDetails.message}
          </p>
          {/* End Distance text */}
          {/* Start Divider */}
          <hr className="border-dashed border-gray-300 my-5" />
          {/* End Divider */}
          {/* Start time and currency */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <figure>
                <Image
                  src="/images/minutes_for_delivery.svg"
                  alt="Delivery Time"
                  width={20}
                  height={20}
                />
              </figure>
              <p className="font-extrabold text-lg text-gray-800">
                {restaurantData[0].card.card.info.sla.slaString}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <figure>
                <Image
                  src="/images/rupees.svg"
                  alt="Delivery Time"
                  width={20}
                  height={20}
                />
              </figure>
              <p className="font-extrabold text-lg text-gray-800">
                {restaurantData[0].card.card.info.costForTwoMessage}
              </p>
            </div>
          </div>
          {/* End time and currency */}
          {/* Start Offers */}
          <div className="mt-5 flex items-center space-x-4 overflow-hidden overflow-x-auto scrollbar-none">
            {restaurantData[1].card.card.gridElements.infoWithStyle.offers.map(
              (offer: any) => {
                return (
                  <div
                    key={Math.random()}
                    className="border border-gray-200 rounded-md pl-2 pr-8 py-2 flex flex-col items-start"
                  >
                    <div className="flex items-center space-x-2">
                      <figure>
                        <Image
                          src={
                            offer.info.offerLogo === "offers/generic"
                              ? SWIGGY_OFFER_GENERIC_LOGO_URL
                              : `${SWIGGY_OFFER_LOGO_URL}${offer.info.offerLogo}`
                          }
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 min-w-[20px]"
                        />
                      </figure>
                      <p className="font-bold text-gray-600 whitespace-nowrap">
                        {offer.info.header}
                      </p>
                    </div>
                    <p className="font-semibold text-xs text-gray-500 whitespace-nowrap">
                      {offer.info.couponCode} | {offer.info.description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
          {/* End Offers */}
          {/* End pure veg, veg and non-veg heading */}
          <div className="mt-10">
            <p className="font-bold text-base text-gray-800">
              {menuList[0].card.card?.isPureVeg ? "Pure Veg" : "Veg Only"}
            </p>
          </div>
          {/* Start pure veg, veg and non-veg heading */}
          {/* Start Divider */}
          <hr className="border-gray-300 mt-4" />
          {/* End Divider */}
          {/* Start Menu Listing */}
          <div className="space-y-3 bg-gray-200">
            {menuList.slice(1, menuList.length - 2).map((menu) => {
              return <MenuList key={Math.random()} menu={menu.card.card} />;
            })}
            <div className="px-3 pb-4">
              <div className="flex items-center space-x-5">
                <figure>
                  <Image
                    src={SWIGGY_FSSAI_IMG_URL}
                    alt="FSSAI"
                    width={70}
                    height={70}
                  />
                </figure>
                <p className="font-normal text-sm text-gray-500">
                  {menuList[menuList.length - 2].card.card.text[0]}
                </p>
              </div>
              <hr className="my-4 border-gray-400" />
              <div>
                <p className="font-bold text-base text-gray-500">
                  {menuList[menuList.length - 1].card.card.name}
                </p>
                <p className="font-normal text-sm text-gray-400">
                  (Outlet:
                  {menuList[menuList.length - 1].card.card.area})
                </p>
                <p className="font-medium text-xs text-gray-400 flex items-end mt-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span>
                    {menuList[menuList.length - 1].card.card.completeAddress}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* End Menu Listing */}
        </div>
      )}
    </div>
  );
}

export default Restaurant;
