import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { SWIGGY_RESTAURANT_LISTING_IMG_URL } from "@/core/utils/common";

function TopRestaurantCard({ data }: any) {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        router.push(
          `/restaurant?name=${data.info.name}&restaurantId=${data.info.id}`
        );
      }}
      onKeyDown={() => {
        router.push(
          `/restaurant?name=${data.info.name}&restaurantId=${data.info.id}`
        );
      }}
      className="w-72 h-full hover:scale-95 transition-transform"
    >
      <figure className="w-72 h-48 relative rounded-xl overflow-hidden">
        <Image
          src={`${SWIGGY_RESTAURANT_LISTING_IMG_URL}${data.info.cloudinaryImageId}`}
          alt={data.info.name}
          width={312}
          height={312}
          className="w-full h-full object-cover"
        />
        <figcaption className="absolute left-0 right-0 bottom-0 flex items-end px-3 py-1 h-20 bg-linear-black-to-white">
          <p className="w-full font-extrabold text-xl text-white">
            {data.info.aggregatedDiscountInfoV3
              ? `${data.info.aggregatedDiscountInfoV3.header} ${
                  data.info.aggregatedDiscountInfoV3.subHeader || ""
                }`
              : ""}
          </p>
        </figcaption>
      </figure>
      <div className="mt-3 px-2">
        <h4 className="font-semibold text-xl text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {data.info.name}
        </h4>
        <div className="flex items-center space-x-1">
          <figure>
            <Image
              src="/images/rating_logo.svg"
              alt="rating"
              width={20}
              height={20}
            />
          </figure>
          <p className="font-medium text-lg">{data.info.avgRatingString}</p>
        </div>
        <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {data.info.cuisines.join(", ")}
        </p>
        <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {data.info.areaName}
        </p>
      </div>
    </div>
  );
}

export default TopRestaurantCard;
