import { SWIGGY_SEARCH_IMG_URL } from "@/core/utils/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps {
  maxWidth?: string;
  restaurantInfo?: any;
}

function SearchResultRestaurantCard({ maxWidth, restaurantInfo }: IProps) {
  const router = useRouter();
  return (
    <div
      role="button"
      onClick={() => {
        if (restaurantInfo.feeDetails.restaurantId) {
          router.push(
            `/restaurant?name=${restaurantInfo.name}&restaurantId=${restaurantInfo.feeDetails.restaurantId}`
          );
        }
      }}
      className={`${
        maxWidth ? maxWidth : ""
      } bg-white pl-4 pr-10 py-5 flex items-center space-x-5 rounded`}
    >
      <figure>
        <Image
          src={`${SWIGGY_SEARCH_IMG_URL}${restaurantInfo.cloudinaryImageId}`}
          alt="Kings"
          width={100}
          height={100}
          className="rounded-md w-24 min-w-[96px]"
        />
      </figure>
      <div className="flex-grow overflow-hidden">
        <h5 className="font-semibold text-base sm:text-xl text-gray-700">
          {restaurantInfo.name}
        </h5>
        <h6 className="font-normal text-sm text-gray-500 mt-1">
          <span>{restaurantInfo.avgRating}</span> .{" "}
          <span>{restaurantInfo.sla.slaString}</span> .{" "}
          <span>
            {restaurantInfo.hasOwnProperty("costForTwoMessage")
              ? restaurantInfo.costForTwoMessage
              : restaurantInfo.costForTwo}
          </span>
        </h6>
        <h6 className="font-normal text-sm text-gray-500 mt-1 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {restaurantInfo.cuisines.join(", ")}
        </h6>
      </div>
    </div>
  );
}

export default SearchResultRestaurantCard;
