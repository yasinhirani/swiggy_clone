"use client";

import MapComponent from "@/components/MapComponent";
import { SWIGGY_RESTAURANT_LISTING_IMG_URL } from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Order() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const { user } = useUser();

  const [orderData, setOrderData] = useState<IOrders | null>(null);
  const [restaurantCoords, setRestaurantCoords] = useState<{
    lng: string;
    lat: string;
  } | null>(null);
  const [userCoords, setUserCoords] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  useEffect(() => {
    if (orderId) {
      swiggyServices
        .getOrderDetail({ email: user?.email!, orderId })
        .then((res) => {
          setOrderData(res.data.orderDetails);
          setRestaurantCoords(
            res.data.orderDetails.orderDetails.RestaurantDetails
              .RestaurantGeometry
          );
          setUserCoords(res.data.orderDetails.userLocation);
        });
    }
  }, [orderId, user?.email]);

  return (
    <div className="mt-20 flex-grow flex flex-col">
      {orderData && (
        <div className="w-full max-w-[76rem] mx-auto px-5 py-10 flex-grow flex flex-col">
          {/* Start Restaurant Details */}
          <div className="flex items-start space-x-8">
            <figure className="w-64 h-48 rounded-lg overflow-hidden">
              <Image
                src={`${SWIGGY_RESTAURANT_LISTING_IMG_URL}${orderData?.orderDetails.RestaurantDetails?.RestaurantImage}`}
                alt="order"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </figure>
            <div>
              <h2 className="font-bold text-3xl mb-2 text-gray-800">
                {orderData?.orderDetails.RestaurantDetails?.RestaurantName}
              </h2>
              <h3 className="font-normal text-lg text-gray-600">
                {orderData?.orderDetails.RestaurantDetails?.RestaurantLocation}
              </h3>
            </div>
          </div>
          {/* End Restaurant Details */}
          {/* Start Order Details */}
          <div className="mt-10 flex flex-col space-y-5">
            {orderData?.orderDetails.Items.map((item) => {
              return (
                <div
                  key={item.ItemId}
                  className="flex justify-between items-center space-x-3 w-96"
                >
                  <div className="flex items-center space-x-2">
                    <figure>
                      <Image
                        src={`${
                          item.IsVeg ? "/images/veg.svg" : "/images/non_veg.svg"
                        }`}
                        alt="Veg"
                        width={20}
                        height={20}
                      />
                    </figure>
                    <h5
                      title="Cheese vada pav"
                      className="font-normal text-base text-gray-800 w-[12ch] sm:w-[30ch] whitespace-nowrap overflow-hidden overflow-ellipsis"
                    >
                      {item.ItemName}
                    </h5>
                  </div>
                  <div className="flex items-center relative">
                    <p className="font-light text-sm text-gray-700 absolute right-0">
                      ₹{item.Total}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* End Order Details */}
          {/* Start Map */}
          <MapComponent
            restaurantCoords={restaurantCoords}
            userCoords={userCoords}
            isFromSuccess={false}
          />
          {/* End Map */}
        </div>
      )}
    </div>
  );
}

export default Order;
