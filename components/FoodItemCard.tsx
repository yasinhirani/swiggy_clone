import { SWIGGY_MENU_ITEM_IMG_URL } from "@/core/utils/common";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

function FoodItemCard({ foodData, addToCart }: any) {
  return (
    <div
      className={`flex justify-between ${
        foodData.imageId ? "items-start" : "items-center"
      } space-x-5`}
    >
      {/* Start Food details */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <figure>
            <Image
              src={`${
                foodData.isVeg ? "/images/veg.svg" : "/images/non_veg.svg"
              }`}
              alt="Veg"
              width={20}
              height={20}
            />
          </figure>
          {foodData.isBestSeller && (
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <p className="font-bold text-sm text-yellow-500">Bestseller</p>
            </div>
          )}
        </div>
        <h4 className="font-medium text-base sm:text-lg text-gray-800">
          {foodData.name}
        </h4>
        <p className="font-normal text-sm">
          ₹{foodData.price / 100 || foodData.defaultPrice / 100}
        </p>
      </div>
      {/* End Food details */}
      {/* Start Food Image */}
      <figure className="flex flex-col items-center">
        {foodData.imageId && (
          <Image
            src={`${SWIGGY_MENU_ITEM_IMG_URL}${foodData.imageId}`}
            alt={foodData.name}
            width={120}
            height={120}
            className="w-28 h-24 min-w-[112px] sm:w-32 sm:h-24 sm:min-w-[128px] rounded-lg object-cover"
          />
        )}
        <figcaption>
          <button
            type="button"
            onClick={() =>
              addToCart(
                foodData.id,
                foodData.isVeg ? true : false,
                foodData.name,
                foodData.price / 100 || foodData.defaultPrice / 100,
                false
              )
            }
            className={`px-5 py-1.5 bg-white font-bold text-base border border-gray-300 rounded shadow shadow-white text-green-600 w-24 ${
              foodData.imageId ? " transform -translate-y-6" : ""
            }`}
          >
            Add
          </button>
        </figcaption>
      </figure>
      {/* End Food Image */}
    </div>
  );
}

export default FoodItemCard;
