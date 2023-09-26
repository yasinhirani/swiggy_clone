"use client";
import { CartContext } from "@/core/context";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function Cart() {
  const { CartData, SetCartData } = useContext(CartContext);
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  const updateCart = (itemId: string, updateType: string) => {
    const copyCart = [...CartData.Items];
    const itemIndex = copyCart.findIndex((item) => item.ItemId === itemId);
    if (itemIndex !== -1) {
      if (updateType === "decrease") {
        if (copyCart[itemIndex].Quantity === 1) {
          copyCart.splice(itemIndex, 1);
          SetCartData({
            Items: copyCart,
            RestaurantDetails: CartData.RestaurantDetails,
          });
        } else {
          copyCart[itemIndex].Quantity -= 1;
          copyCart[itemIndex].Total =
            copyCart[itemIndex].Quantity * copyCart[itemIndex].Price;
          SetCartData({
            Items: copyCart,
            RestaurantDetails: CartData.RestaurantDetails,
          });
        }
      } else {
        copyCart[itemIndex].Quantity += 1;
        copyCart[itemIndex].Total =
          copyCart[itemIndex].Quantity * copyCart[itemIndex].Price;
        SetCartData({
          Items: copyCart,
          RestaurantDetails: CartData.RestaurantDetails,
        });
      }
    }
  };

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    localStorage.setItem("cartData", JSON.stringify(CartData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartData]);
  return (
    <div className="mt-20 flex-grow bg-gray-100 flex flex-col">
      {CartData.Items.length > 0 ? (
        <div className="w-full max-w-[76rem] mx-auto p-5 flex space-x-8">
          {/* Start Left section */}
          <div className="flex-grow">
            <div className="bg-white p-6">
              {isLoading && (
                <h4 className="font-bold text-2xl text-gray-800">
                  Please wait...
                </h4>
              )}
              {!isLoading && !user && (
                <>
                  <h4 className="font-bold text-2xl text-gray-800">Account</h4>
                  <h5 className="font-normal text-lg text-gray-500">
                    To place your order now, log in to your existing account or
                    sign up.
                  </h5>
                  <div className="flex items-center space-x-6 mt-10">
                    <Link
                      href="/api/auth/login"
                      className="flex flex-col items-center border border-[#60b246] text-[#60b246] w-48 px-4 py-2"
                    >
                      <span className="font-light text-xs">
                        Have an account?
                      </span>
                      <span className="font-bold text-base uppercase">
                        Login
                      </span>
                    </Link>
                    <Link
                      href="/api/auth/login"
                      className="flex flex-col items-center border border-[#60b246] bg-[#60b246] text-white w-48 px-4 py-2"
                    >
                      <span className="font-light text-xs">New to Swiggy</span>
                      <span className="font-bold text-base uppercase">
                        sign up
                      </span>
                    </Link>
                  </div>
                </>
              )}
              {!isLoading && user && (
                <>
                  <h4 className="font-bold text-2xl text-gray-800">
                    Logged In as
                  </h4>
                  <h5 className="font-medium text-xl text-gray-800 mt-5">
                    {user.nickname}
                  </h5>
                </>
              )}
            </div>
          </div>
          {/* End Left section */}
          {/* Start Right section */}
          <div className="w-80 min-w-[366px] bg-white px-6 py-5">
            {/* Start Restaurant Info */}
            <div className="flex items-start space-x-4">
              <figure>
                <Image
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${CartData.RestaurantDetails?.RestaurantImage}`}
                  alt=""
                  width={60}
                  height={60}
                />
              </figure>
              <div>
                <h4 className="font-medium text-lg text-gray-700">
                  {CartData.RestaurantDetails?.RestaurantName}
                </h4>
                <h6 className="font-normal text-sm text-gray-600">
                  {CartData.RestaurantDetails?.RestaurantLocation}
                </h6>
                <div className="w-12 h-[2px] bg-gray-700 mt-3" />
              </div>
            </div>
            {/* End Restaurant Info */}
            {/* Start Menu items */}
            <div className="mt-8 space-y-3">
              {CartData.Items.map((item) => {
                return (
                  <div
                    key={Math.random()}
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
                      <h5 className="font-normal text-base text-gray-800">
                        {item.ItemName}
                      </h5>
                      <div className="border border-gray-300 flex justify-between items-center space-x-2 px-2 w-16">
                        <button
                          type="button"
                          onClick={() => updateCart(item.ItemId, "decrease")}
                          className="text-gray-400 text-lg"
                        >
                          -
                        </button>
                        <span className="text-[#60b246]">{item.Quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCart(item.ItemId, "increase")}
                          className="text-[#60b246] text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="font-light text-sm text-gray-700">
                      ₹{item.Total}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* End Menu items */}
            <hr className="border-gray-300 my-6" />
            {/* Start bill details */}
            <div>
              <h5 className="font-medium text-sm text-gray-700">
                Bill Details
              </h5>
              <div className="flex justify-between items-center mt-3">
                <span className="font-light text-sm text-gray-600">
                  Item Total
                </span>
                <span className="font-light text-sm text-gray-600">₹60</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-light text-sm text-gray-600">
                  Delivery Partner
                </span>
                <span className="font-light text-sm text-gray-600">₹0</span>
              </div>
              <hr className="border-gray-300 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-light text-sm text-gray-600">
                  Platform Fee
                </span>
                <span className="font-light text-sm text-gray-600">₹0</span>
              </div>
              <div className="w-full h-[2px] bg-gray-700 mt-6 mb-4" />
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base text-gray-800">
                  To Pay
                </span>
                <span className="font-semibold text-base text-gray-800">
                  ₹60
                </span>
              </div>
            </div>
            {/* End bill details */}
          </div>
          {/* End Right section */}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center p-5">
          <div className="flex flex-col items-center">
            <figure>
              <Image
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
                alt="Cart Empty"
                width={300}
                height={300}
              />
            </figure>
            <p className="font-bold text-gray-700 text-2xl mt-5 text-center">
              Your cart is empty
            </p>
            <p className="font-medium text-gray-500 text-base mt-2 text-center">
              You can go to home page to view more restaurants
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-orange-500 px-6 py-2 text-white mt-6"
            >
              SEE RESTAURANTS NEAR YOU
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
