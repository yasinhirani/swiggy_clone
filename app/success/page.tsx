"use client";

import MapComponent from "@/components/MapComponent";
import swiggyServices from "@/shared/service/swiggy.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Success() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  const { user } = useUser();

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
          if (res.data.success) {
            setRestaurantCoords(
              res.data.orderDetails.orderDetails.RestaurantDetails
                .RestaurantGeometry
            );
            setUserCoords(res.data.orderDetails.userLocation);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, user]);

  return (
    <div className="mt-20 flex-grow bg-gray-100 px-5 py-10">
      <div className="w-full max-w-[76rem] mx-auto flex-grow flex flex-col">
        <div className="bg-white rounded-md shadow-md p-6 flex items-start space-x-6">
          <div>
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <div>
            <h2 className="font-extrabold text-2xl md:text-4xl">
              Thank you for your order!
            </h2>
            <h4 className="font-normal text-lg mt-3">
              Your order was successfully placed and is being prepared.
            </h4>
          </div>
        </div>
        <MapComponent
          restaurantCoords={restaurantCoords}
          userCoords={userCoords}
          isFromSuccess
        />
      </div>
    </div>
  );
}

export default Success;
