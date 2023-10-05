"use client";
import OrderListing from "@/components/profile/OrderListing";
import SwiggyOne from "@/components/profile/SwiggyOne";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { ArrowLeftIcon, GiftIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Link from "next/link";

export default withPageAuthRequired(function Profile() {
  const { user } = useUser();

  const [optionIndexSelected, setOptionIndexSelected] = useState<number>(0);

  const profileOptions = [
    {
      key: "orders",
      label: "Orders",
      icon: <ShoppingBagIcon className="w-5 h-5" />,
      component: <OrderListing />,
    },
    {
      key: "swiggy_one",
      label: "Swiggy One",
      icon: <GiftIcon className="w-5 h-5" />,
      component: <SwiggyOne />,
    },
  ];
  return (
    <div className="mt-20 flex-grow flex flex-col bg-[#37718e]">
      <div className="w-full max-w-[76rem] mx-auto px-5 pt-10 flex-grow flex flex-col mb-16 lg:mb-0">
        <div className="my-9 text-white">
          <h2 className="font-extrabold text-4xl">{user?.nickname}</h2>
          <h4 className="font-light text-base mt-3">{user?.email}</h4>
        </div>
        <div className="w-full bg-gray-50 flex-grow flex flex-col md:flex-row md:space-x-8 p-6 sm:p-10">
          {/* Start Left Menu Section */}
          <div className="bg-gray-200 w-full md:w-64 md:min-w-[256px] px-5 md:px-0 md:pl-6 py-6">
            <ul className="flex flex-col">
              {profileOptions.map((option, index) => {
                return (
                  <li key={option.key}>
                    <button
                      onClick={() => setOptionIndexSelected(index)}
                      className={`px-6 md:px-0 md:pl-10 md:pr-6 py-6 ${
                        optionIndexSelected === index
                          ? "bg-white font-semibold"
                          : "bg-transparent font-normal hover:font-semibold"
                      } text-base w-full text-left flex items-center space-x-4`}
                    >
                      <span>{option.icon}</span>
                      <span>{option.label}</span>
                    </button>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/api/auth/logout"
                  className="px-6 md:px-0 md:pl-10 md:pr-6 py-6 bg-transparent font-normal hover:font-semibold text-base w-full text-left flex items-center space-x-4"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* End Left Menu Section */}
          {/* Start Right Content Section */}
          <div className="mt-5 flex-grow">
            {profileOptions[optionIndexSelected].component}
          </div>
          {/* End Right Content Section */}
        </div>
      </div>
    </div>
  );
});
