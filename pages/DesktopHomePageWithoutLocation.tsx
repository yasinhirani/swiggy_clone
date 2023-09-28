import { LocationContext } from "@/core/context";
import locationService from "@/core/service/location.service";
import {
  SWIGGY_HERO_LIGHTNING_FAST_DELIVERY_IMG_URL,
  SWIGGY_HERO_LIVE_ORDER_TRACKING_IMG_URL,
  SWIGGY_HERO_NO_MINIMUM_ORDER_IMG_URL,
} from "@/core/utils/common";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";
import Image from "next/image";
import React, { useContext, useState } from "react";

function DesktopHomePageWithoutLocation() {
  const { setLocationInfo } = useContext(LocationContext);
  const popularCities = [
    "Ahmedabad",
    "Bangalore",
    "Chennai",
    "Delhi",
    "Gurgaon",
    "Hyderabad",
    "Kolkata",
    "Mumbai",
    "Pune",
    "& more.",
  ];

  const [suggestions, setSuggestions] = useState<Array<any> | null>(null);

  const getLocations = (locationName: string) => {
    locationService.getLocation(locationName).then((res) => {
      if (res.data.data.length > 0) {
        setSuggestions(res.data.data);
      } else {
        setSuggestions([]);
      }
    });
  };

  const getLocationInfo = (placeId: string) => {
    locationService.getLocationInfo(placeId).then((res) => {
      setLocationInfo(res.data.data[0]);
      localStorage.setItem("userLocation", JSON.stringify(res.data.data[0]));
      setSuggestions(null);
    });
  };

  const getSuggestions = debounce((searchText: string) => {
    if (searchText !== "") {
      getLocations(searchText);
    } else {
      setSuggestions(null);
    }
  }, 500);
  return (
    <div>
      <div className="relative">
        <div className="w-full max-w-[76rem] h-auto lg:h-[500px] mx-auto p-5">
          <div className="w-full lg:w-[680px] lg:pr-20">
            <div className="flex justify-between items-start space-x-5">
              <figure>
                <Image
                  src="/images/swiggy_with_text.svg"
                  alt="swiggy"
                  width={150}
                  height={150}
                />
              </figure>
              <div className="flex items-center space-x-2">
                <button className="w-28 font-semibold bg-white px-3 py-2">
                  Login
                </button>
                <button className="w-28 font-semibold bg-black text-white px-3 py-2">
                  Sign up
                </button>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-[40px] text-gray-700">
                Cooking gone wrong?
              </h2>
              <h3 className="font-normal text-2xl text-gray-500 mt-2">
                Order food from favourite restaurants near you.
              </h3>
              <div className="mt-8 flex items-center relative">
                <input
                  type="text"
                  className="border border-gray-300 px-5 py-3 w-full font-medium text-base placeholder:font-semibold outline-none"
                  name="locationName"
                  id="locationName"
                  onChange={(e) => getSuggestions(e.target.value)}
                  placeholder="Enter your delivery location"
                />
                <button
                  type="button"
                  className="bg-orange-500 p-3 whitespace-nowrap border border-orange-500 text-white font-bold"
                >
                  FIND FOOD
                </button>
                {suggestions && suggestions.length > 0 && (
                  <div className="h-64 absolute left-0 right-0 top-16 bg-white p-5 space-y-8 overflow-hidden overflow-y-auto">
                    {suggestions.map((suggestion) => {
                      return (
                        <button
                          type="button"
                          key={Math.random()}
                          onClick={() => getLocationInfo(suggestion.place_id)}
                          className="flex items-start space-x-5 w-full text-left group"
                        >
                          <MapPinIcon className="w-6 h-6" />
                          <div className="border-b border-dashed border-gray-400 w-full pb-4">
                            <p className="font-normal text-lg break-words group-hover:text-orange-500">
                              {suggestion.structured_formatting.main_text}
                            </p>
                            <p className="font-normal text-sm text-gray-500 break-words">
                              {suggestion.structured_formatting.secondary_text}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                {suggestions && suggestions.length === 0 && (
                  <div className="absolute left-0 right-0 top-16 bg-white p-5">
                    <p className="font-semibold text-xl text-gray-700">
                      No location found
                    </p>
                  </div>
                )}
              </div>
              <p className="font-normal text-base text-gray-400 uppercase mt-8">
                popular cities in india
              </p>
              <p className="mt-2 w-full sm:w-[60ch]">
                {popularCities.map((city, index) => {
                  return (
                    <span
                      key={Math.random()}
                      className={`${
                        index % 2 === 0 ? "text-gray-500" : "text-gray-400"
                      } font-semibold`}
                    >
                      {city}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
          <div className="hero hidden lg:block" />
        </div>
      </div>
      <div className="bg-[#2b1e16]">
        <div className="w-full max-w-[76rem] mx-auto px-5 pb-10 flex flex-col sm:flex-row justify-between items-center sm:space-x-10 space-y-10 sm:space-y-0">
          <div className="flex flex-col items-center">
            <figure>
              <Image
                src={SWIGGY_HERO_NO_MINIMUM_ORDER_IMG_URL}
                alt="No minimum order"
                width={100}
                height={100}
              />
            </figure>
            <h4 className="font-bold text-lg text-white text-center mt-8">
              No Minimum Order
            </h4>
            <p className="font-medium text-base text-gray-300 text-center mt-4">
              Order in for yourself or for the group, with no restrictions on
              order value
            </p>
          </div>
          <div className="flex flex-col items-center">
            <figure>
              <Image
                src={SWIGGY_HERO_LIVE_ORDER_TRACKING_IMG_URL}
                alt="No minimum order"
                width={100}
                height={100}
              />
            </figure>
            <h4 className="font-bold text-lg text-white text-center mt-8">
              Live Order Tracking
            </h4>
            <p className="font-medium text-base text-gray-300 text-center mt-4">
              Know where your order is at all times, from the restaurant to your
              doorstep
            </p>
          </div>
          <div className="flex flex-col items-center">
            <figure>
              <Image
                src={SWIGGY_HERO_LIGHTNING_FAST_DELIVERY_IMG_URL}
                alt="No minimum order"
                width={120}
                height={120}
              />
            </figure>
            <h4 className="font-bold text-lg text-white text-center mt-8">
              Lightning-Fast Delivery
            </h4>
            <p className="font-medium text-base text-gray-300 text-center mt-4">
              Experience {`Swiggy's`} superfast delivery for food delivered
              fresh & on time
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="w-full max-w-[70rem] mx-auto px-6 py-7 flex flex-col sm:flex-row justify-between sm:items-center sm:space-x-5 space-y-6 sm:space-y-0">
          <h4 className="font-extrabold text-2xl sm:text-3xl sm:w-[25ch] text-gray-800">
            For better experience,download the Swiggy app now
          </h4>
          <div className="flex items-center space-x-4">
            <a
              href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
              target="_blank"
            >
              <figure>
                <Image
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png"
                  alt="Swiggy Play Store"
                  width={200}
                  height={200}
                />
              </figure>
            </a>
            <a
              href="https://itunes.apple.com/in/app/id989540920?referrer=utm_source%3Dswiggy%26utm_medium%3Dhomepage"
              target="_blank"
            >
              <figure>
                <Image
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png"
                  alt="Swiggy Play Store"
                  width={200}
                  height={200}
                />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopHomePageWithoutLocation;
