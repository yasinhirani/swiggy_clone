import { SWIGGY_MENU_ITEM_IMG_URL } from "@/core/utils/common";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchResultDishCard({ dishInfo, addToCart }: any) {
  const router = useRouter();
  const [isFullDescriptionEnabled, setIsFullDescriptionEnabled] =
    useState<boolean>(false);
  return (
    <div className="bg-white p-4 rounded-3xl">
      {/* Start Restaurant detail */}
      <div
        role="button"
        onClick={() =>
          router.push(
            `/restaurant?name=${dishInfo.restaurant.info.name}&restaurantId=${dishInfo.restaurant.info.feeDetails.restaurantId}`
          )
        }
        className="flex justify-between items-center space-x-5"
      >
        <div>
          <h5 className="font-bold text-gray-600">
            By {dishInfo.restaurant.info.name}
          </h5>
          <h6 className="font-medium text-sm text-gray-500">
            {dishInfo.restaurant.info.avgRating} .{" "}
            {dishInfo.restaurant.info.sla.slaString}
          </h6>
        </div>
        <span>
          <ArrowRightIcon className="w-6 h-6" />
        </span>
      </div>
      {/* End Restaurant detail */}
      <hr className="border-dashed my-4" />
      <div className="flex justify-between items-start space-x-5">
        <div>
          <figure>
            <Image
              src={
                dishInfo.info.hasOwnProperty("isVeg") && dishInfo.info.isVeg
                  ? "/images/veg.svg"
                  : "/images/non_veg.svg"
              }
              alt="Veg"
              width={20}
              height={20}
            />
          </figure>
          <h6 className="mt-2 font-medium text-gray-600 text-base sm:text-xl">
            {dishInfo.info.name}
          </h6>
          <p className="mt-1 font-normal text-base text-gray-600">
            ₹{dishInfo.info.price / 100}
          </p>
          <p
            className={`font-light text-sm text-gray-500 mt-3 ${
              isFullDescriptionEnabled ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {dishInfo.info.description}
          </p>
          {dishInfo.info.description && (
            <button
              type="button"
              onClick={() =>
                setIsFullDescriptionEnabled(!isFullDescriptionEnabled)
              }
              className="font-light text-sm text-gray-500 mt-2"
            >
              {isFullDescriptionEnabled ? "show less" : "show more"}
            </button>
          )}
        </div>
        <figure className="flex flex-col items-center">
          {dishInfo.info.imageId && (
            <Image
              src={`${SWIGGY_MENU_ITEM_IMG_URL}${dishInfo.info.imageId}`}
              alt={""}
              width={120}
              height={120}
              className="w-28 h-24 min-w-[112px] sm:w-32 sm:h-24 sm:min-w-[128px] rounded-lg object-cover"
            />
          )}
          <figcaption>
            <button
              type="button"
              onClick={() => {
                addToCart(
                  dishInfo.info.id,
                  dishInfo.info.hasOwnProperty("isVeg") ? true : false,
                  dishInfo.info.name,
                  dishInfo.info.price / 100,
                  false,
                  {
                    RestaurantId: dishInfo.restaurant.info.id,
                    RestaurantName: dishInfo.restaurant.info.name,
                    RestaurantLocation: dishInfo.restaurant.info.areaName,
                    RestaurantImage: dishInfo.restaurant.info.cloudinaryImageId,
                  }
                );
              }}
              className={`px-5 py-1.5 bg-white font-bold text-base border border-gray-300 rounded shadow shadow-white text-green-600 w-24 ${
                dishInfo.info.imageId ? " transform -translate-y-6" : ""
              }`}
            >
              Add
            </button>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default SearchResultDishCard;
