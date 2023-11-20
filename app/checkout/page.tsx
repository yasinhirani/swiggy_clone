"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "@/shared/model/state.mode";
import { updateCart } from "@/features/addToCart/addToCart";
import CartEmpty from "@/components/CartEmpty";
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadStripe } from "@stripe/stripe-js";

function Cart() {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);

  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const cartState = useSelector((state: IState) => state.cart);
  const locationState = useSelector(
    (state: IState) => state.location.geometry.location
  );

  const placeOrder = async () => {
    // axios
    //   .post("/api/placeOrder", {
    //     email: user?.email,
    //     cartData: cartState
    //   })
    //   .then((res) => {
    //     if (res.data.success) {
    //       dispatch(resetCart());
    //       toast.success(res.data.message);
    //       router.push("/");
    //     } else {
    //       toast.error("Something went wrong while placing the order.");
    //     }
    //   });

    const stripe = await stripePromise;

    const checkoutSession = await axios
      .post("/api/create-checkout-session", {
        email: user?.email,
        cartData: cartState,
        userLocation: {
          lat: locationState.lat,
          lng: locationState.lng
        }
      })
      .then((res) => res.data);

    if (checkoutSession.success && user?.email) {
      const result = await stripe
        ?.redirectToCheckout({
          sessionId: checkoutSession.id
        })
        .then((res) => res);
      // if (result?.error) {
      //   toast.error(result.error.message!);
      // }
      console.log(result);
    }
  };

  if (cartState.Items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="mt-20 flex-grow bg-gray-100 flex flex-col">
      <div className="w-full max-w-[76rem] mx-auto p-5 flex-grow flex flex-col-reverse sm:flex-row sm:space-x-8 px-6 py-10 mb-16 lg:mb-0">
        {/* Start Left section */}
        <div className="w-full sm:flex-grow mt-6 sm:mt-0">
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
                    <span className="font-light text-xs">Have an account?</span>
                    <span className="font-bold text-base uppercase">Login</span>
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
                <button
                  type="button"
                  onClick={() => placeOrder()}
                  className="flex flex-col items-center border border-[#60b246] bg-[#60b246] text-white w-60 px-4 py-2 font-bold mt-5"
                >
                  Place you order
                </button>
              </>
            )}
          </div>
        </div>
        {/* End Left section */}
        {/* Start Right section */}
        <div className="w-full sm:w-80 sm:min-w-[366px] bg-white px-6 py-5">
          {/* Start Restaurant Info */}
          <div className="flex items-start space-x-4">
            <figure>
              <Image
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/${cartState.RestaurantDetails?.RestaurantImage}`}
                alt=""
                width={60}
                height={60}
              />
            </figure>
            <div>
              <h4 className="font-medium text-lg text-gray-700">
                {cartState.RestaurantDetails?.RestaurantName}
              </h4>
              <h6 className="font-normal text-sm text-gray-600">
                {cartState.RestaurantDetails?.RestaurantLocation}
              </h6>
              <div className="w-12 h-[2px] bg-gray-700 mt-3" />
            </div>
          </div>
          {/* End Restaurant Info */}
          {/* Start Menu items */}
          <div className="mt-8 space-y-3">
            {cartState.Items.map((item: ICartItems) => {
              return (
                <div
                  key={item.ItemId}
                  className="flex justify-between items-center space-x-3"
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
                      title={item.ItemName}
                      className="font-normal text-base text-gray-800 w-[12ch] sm:w-[16ch] whitespace-nowrap overflow-hidden overflow-ellipsis"
                    >
                      {item.ItemName}
                    </h5>
                  </div>
                  <div className="flex items-center relative">
                    <div className="border border-gray-300 flex justify-between items-center space-x-2 px-2 w-16 mr-12">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              updateType: "remove",
                              updateDetails: {
                                ItemId: item.ItemId
                              }
                            })
                          )
                        }
                        className="text-gray-400 text-lg"
                      >
                        -
                      </button>
                      <span className="text-[#60b246]">{item.Quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            updateCart({
                              updateType: "add",
                              updateDetails: {
                                ItemId: item.ItemId
                              }
                            })
                          )
                        }
                        className="text-[#60b246] text-lg"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-light text-sm text-gray-700 absolute right-0">
                      ₹{item.Total}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* End Menu items */}
          <hr className="border-gray-300 my-6" />
          {/* Start bill details */}
          <div>
            <h5 className="font-medium text-sm text-gray-700">Bill Details</h5>
            <div className="flex justify-between items-center mt-3">
              <span className="font-light text-sm text-gray-600">
                Item Total
              </span>
              <span className="font-light text-sm text-gray-600">
                ₹
                {cartState.Items.reduce(
                  (acc: number, item: ICartItems) => acc + item.Total,
                  0
                )}
              </span>
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
                ₹
                {cartState.Items.reduce(
                  (acc: number, item: ICartItems) => acc + item.Total,
                  0
                )}
              </span>
            </div>
          </div>
          {/* End bill details */}
        </div>
        {/* End Right section */}
      </div>
    </div>
  );
}

export default Cart;
