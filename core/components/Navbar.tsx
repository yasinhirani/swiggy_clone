"use client";
import { useState, useContext } from "react";
import {
  ChevronDownIcon,
  LifebuoyIcon,
  UserIcon,
  GiftIcon,
  ShoppingBagIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import locationService from "../service/location.service";
import { debounce } from "lodash";
import { CartContext, LocationContext } from "../context";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

function Navbar() {
  const { locationInfo, setLocationInfo } = useContext(LocationContext);
  const { CartData } = useContext(CartContext);
  const router = useRouter();
  const pathName = usePathname();
  const { user, isLoading } = useUser();
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);
  const [locationList, setLocationList] = useState<Array<any> | null>(null);

  const getLocations = (locationName: string) => {
    locationService.getLocation(locationName).then((res) => {
      if (res.data.data.length > 0) {
        setLocationList(res.data.data);
      } else {
        setLocationList([]);
      }
    });
  };

  const getLocationInfo = (placeId: string) => {
    locationService.getLocationInfo(placeId).then((res) => {
      setLocationInfo(res.data.data[0]);
      localStorage.setItem("userLocation", JSON.stringify(res.data.data[0]));
      setLocationList(null);
      setIsLocationModalOpen(false);
      router.push("/");
    });
  };

  const handleInputChangeForLocationFetch = debounce((searchText: string) => {
    if (searchText !== "") {
      getLocations(searchText.trim());
    } else {
      setLocationList(null);
      return;
    }
  }, 500);
  return (
    <>
      <nav className="w-full flex items-center h-20 shadow-xl bg-white fixed top-0 px-6 py-3 z-10">
        <div className="w-full max-w-[76rem] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-8">
            <Link href="/">
              <figure>
                <Image
                  src="/images/swiggy.svg"
                  alt="Swiggy"
                  width={40}
                  height={40}
                  className="w-8 h-8 min-w-[32px] sm:w-12 sm:h-12 hover:scale-110 transition-transform"
                />
              </figure>
            </Link>
            {pathName && !pathName?.includes("support") ? (
              <button
                type="button"
                onClick={() => setIsLocationModalOpen(true)}
                className="text-sm flex items-center group"
              >
                <span className="border-b-2 border-black font-extrabold group-hover:text-orange-500 group-hover:border-orange-500">
                  Other
                </span>
                <span className="pl-2 text-gray-500 font-normal whitespace-nowrap w-full max-w-[25ch] overflow-hidden overflow-ellipsis">
                  {locationInfo?.formatted_address}
                </span>
                <ChevronDownIcon className="w-5 h-5 text-orange-500 ml-2" />
              </button>
            ) : (
              <h2 className="font-extrabold text-base uppercase text-gray-800">
                Help
              </h2>
            )}
          </div>
          <div>
            <ul className="flex items-center space-x-8 lg:space-x-12">
              <li className="hidden lg:list-item">
                <Link
                  href="/search"
                  className="text-base font-medium flex items-center space-x-2 hover:text-orange-500"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Search</span>
                </Link>
              </li>
              <li className="hidden lg:list-item">
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2 hover:text-orange-500"
                >
                  <GiftIcon className="w-5 h-5" />
                  <span>Offers</span>
                </Link>
              </li>
              <li className="hidden lg:list-item">
                <Link
                  href="/support"
                  className="text-base font-medium flex items-center space-x-2 hover:text-orange-500"
                >
                  <LifebuoyIcon className="w-5 h-5" />
                  <span>Help</span>
                </Link>
              </li>
              <li className="hidden lg:list-item">
                {!user && (
                  <Link
                    href="/api/auth/login"
                    className="text-base font-medium flex items-center space-x-2 hover:text-orange-500"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span>{isLoading ? "Please wait" : "Sign In"}</span>
                  </Link>
                )}
                {user && (
                  <Link
                    href="/api/auth/logout"
                    className="text-base font-medium flex items-center space-x-2"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="w-[10ch] overflow-hidden overflow-ellipsis">
                      {isLoading ? "Please wait" : user.name}
                    </span>
                  </Link>
                )}
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="text-base font-medium flex items-center space-x-2 group hover:text-orange-500"
                >
                  <span className="relative">
                    <small
                      className={`${
                        CartData.Items.length > 0
                          ? "text-white"
                          : "text-black group-hover:text-orange-500"
                      } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold`}
                    >
                      {CartData?.Items.length}
                    </small>
                    <svg
                      className={`${
                        CartData.Items.length > 0
                          ? "stroke-[#60b246] fill-[#60b246] group-hover:fill-orange-500"
                          : "stroke-black fill-white"
                      } group-hover:stroke-orange-500 stroke-2`}
                      viewBox="-1 0 37 32"
                      height="20"
                      width="20"
                      fill="currentColor"
                    >
                      <path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path>
                    </svg>
                  </span>
                  <span>Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isLocationModalOpen && (
        <div
          role="button"
          onClick={() => {
            setLocationList(null);
            setIsLocationModalOpen(false);
          }}
          className="absolute inset-0 bg-black bg-opacity-25 z-20"
        />
      )}
      <div
        className={`w-72 sm:w-96 h-full absolute ${
          isLocationModalOpen ? "left-0" : "-left-full"
        } bg-white z-30 transition-all px-6 py-10`}
      >
        <input
          type="text"
          name="location"
          id="location"
          autoComplete="off"
          onChange={(e) => handleInputChangeForLocationFetch(e.target.value)}
          placeholder="Search for area, street name..."
          className="w-full border border-gray-300 shadow-md px-4 py-3 outline-none"
        />
        {locationList && locationList.length > 0 && (
          <div className="mt-10 space-y-8">
            {locationList.map((list) => {
              return (
                <button
                  type="button"
                  key={Math.random()}
                  onClick={() => getLocationInfo(list.place_id)}
                  className="flex items-start space-x-5 w-full text-left group"
                >
                  <MapPinIcon className="w-5 h-5" />
                  <div className="border-b border-dashed border-gray-400 w-full pb-6">
                    <p className="font-normal text-lg break-words group-hover:text-orange-500">
                      {list.structured_formatting.main_text}
                    </p>
                    <p className="font-normal text-sm text-gray-500 break-words">
                      {list.structured_formatting.secondary_text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
        {locationList && locationList.length === 0 && (
          <p className="mt-8 font-semibold text-xl text-gray-700">
            No location found
          </p>
        )}
      </div>
    </>
  );
}

export default Navbar;
