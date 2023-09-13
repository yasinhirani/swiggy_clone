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
import { LocationContext } from "../context";
import { useRouter } from "next/navigation";

function Navbar() {
  const { locationInfo, setLocationInfo } = useContext(LocationContext);
  const router = useRouter();
  const [isLocationModalOpen, setIsLocationModalOpen] =
    useState<boolean>(false);
  const [locationList, setLocationList] = useState<Array<any> | null>(null);

  const getLocations = (locationName: string) => {
    locationService.getLocation(locationName).then((res) => {
      setLocationList(res.data.data);
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
  }, 800);
  return (
    <>
      <nav className="w-full flex items-center h-20 shadow-xl bg-white fixed top-0 px-6 py-3 z-10">
        <div className="w-full max-w-[76rem] mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <figure>
                <Image
                  src="/images/swiggy.svg"
                  alt="Swiggy"
                  width={40}
                  height={40}
                  className="w-12 h-12 hover:scale-110 transition-transform"
                />
              </figure>
            </Link>
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="text-sm flex items-center group"
            >
              <span className="border-b-2 border-black font-extrabold group-hover:text-orange-500 group-hover:border-orange-500">
                Other
              </span>
              <span className="pl-2 text-gray-500 font-normal">
                {locationInfo?.formatted_address}
              </span>
              <ChevronDownIcon className="w-5 h-5 text-orange-500 ml-2" />
            </button>
          </div>
          <div>
            <ul className="flex items-center space-x-12">
              <li>
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  <span>Search</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <GiftIcon className="w-5 h-5" />
                  <span>Offers</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <LifebuoyIcon className="w-5 h-5" />
                  <span>Help</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-base font-medium flex items-center space-x-2"
                >
                  <ShoppingBagIcon className="w-5 h-5" />
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
        className={`w-96 h-full absolute ${
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
                  className="flex items-start space-x-5 w-full text-left"
                >
                  <MapPinIcon className="w-5 h-5" />
                  <div className="border-b border-dashed border-gray-400 w-full pb-6">
                    <p className="font-normal text-lg break-words">
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
      </div>
    </>
  );
}

export default Navbar;
