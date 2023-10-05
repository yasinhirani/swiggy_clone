"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import { SWIGGY_NO_ORDER_FOUND_IMG_URL } from "@/core/utils/common";

function OrderListing() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Array<ICartData> | null>(null);
  const getUserOrders = () => {
    axios.post("/api/getOrderListing", { email: user?.email }).then((res) => {
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    });
  };

  useEffect(() => {
    getUserOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {orders && orders.length > 0 && (
        <>
          <h2 className="font-bold text-2xl text-gray-800 capitalize mb-2">
            Order Listing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
            {orders.map((order) => {
              return (
                <div
                  key={order.RestaurantDetails?.RestaurantId}
                  className="bg-white shadow-md p-5 rounded-lg w-full"
                >
                  <div className="flex items-start space-x-4">
                    <figure>
                      <Image
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${order.RestaurantDetails?.RestaurantImage}`}
                        alt=""
                        width={60}
                        height={60}
                      />
                    </figure>
                    <div>
                      <h4 className="font-medium text-lg text-gray-700">
                        {order.RestaurantDetails?.RestaurantName}
                      </h4>
                      <h6 className="font-normal text-sm text-gray-600">
                        {order.RestaurantDetails?.RestaurantLocation}
                      </h6>
                    </div>
                  </div>
                  <div className="mt-4 space-y-3">
                    {order.Items.map((item) => {
                      return (
                        <div
                          key={item.ItemId}
                          className="flex justify-between items-center space-x-3"
                        >
                          <div className="flex items-center space-x-2">
                            <figure>
                              <Image
                                src={`${
                                  item.IsVeg
                                    ? "/images/veg.svg"
                                    : "/images/non_veg.svg"
                                }`}
                                alt="Veg"
                                width={20}
                                height={20}
                              />
                            </figure>
                            <h5
                              title={item.ItemName}
                              className="font-normal text-base text-gray-800 w-[12ch] sm:w-[16ch] whitespace-nowrap overflow-hidden overflow-ellipsis"
                            >
                              {item.ItemName}
                            </h5>
                          </div>
                          <p className="font-light text-sm text-gray-700">
                            <span>₹{item.Total}</span>
                            {item.Quantity > 1 && (
                              <>
                                <span className="font-light text-xs px-0.5">
                                  x
                                </span>
                                <span>{item.Quantity}</span>
                              </>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
      {orders && orders.length === 0 && (
        <div className="flex flex-col items-center mt-6">
          <figure>
            <Image
              src={SWIGGY_NO_ORDER_FOUND_IMG_URL}
              alt="No Order Found"
              width={350}
              height={350}
            />
          </figure>
          <h4 className="font-medium text-xl text-gray-600 text-center mt-8">
            No Orders
          </h4>
          <h6 className="font-light text-base text-gray-400 mt-2">{`You haven't placed any order yet.`}</h6>
        </div>
      )}
      {!orders && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-10">
          {new Array(4).fill(0).map(() => {
            return (
              <div key={Math.random()} className="space-y-3">
                <div className="w-full h-48 bg-gray-200" />
                <div className="w-36 h-3 bg-gray-200" />
                <div className="w-28 h-3 bg-gray-200" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default OrderListing;
