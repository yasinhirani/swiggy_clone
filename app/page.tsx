"use client";
import Navbar from "@/core/components/Navbar";
import {
  SWIGGY_CAROUSAL_IMG_URL,
  SWIGGY_RESTAURANT_LISTING_IMG_URL,
  SWIGGY_WHATS_ON_MIND_IMG_URL,
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

function Home() {
  const bestOffersScrollRef = useRef<HTMLDivElement>(null);
  const whatsOnYourMindScrollRef = useRef<HTMLDivElement>(null);
  const topRestaurantChainScrollRef = useRef<HTMLDivElement>(null);
  const [swiggyData, setSwiggyData] = useState<any>([]);

  const getSwiggyData = () => {
    swiggyServices
      .getHomePageData()
      .then((res) => {
        console.log(res.data);
        setSwiggyData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    getSwiggyData();
  }, []);
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Navbar />
      <div className="mt-20">
        <div className="w-full max-w-[90rem] mx-auto px-6 py-8">
          {/* Start Best offers */}
          <div>
            <div className="flex justify-between items-center space-x-5">
              <h3 className="font-extrabold text-2xl">Best offers for you</h3>
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  onClick={() => {
                    if (bestOffersScrollRef.current) {
                      bestOffersScrollRef.current.scrollLeft -= 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (bestOffersScrollRef.current) {
                      bestOffersScrollRef.current.scrollLeft += 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={bestOffersScrollRef}
              className="mt-4 flex items-center space-x-5 overflow-hidden overflow-x-auto scrollbar-none"
            >
              {swiggyData &&
                swiggyData.data &&
                swiggyData.data.cards[0].card.card.gridElements.infoWithStyle.info.map(
                  (data: any) => {
                    return (
                      <figure key={Math.random()}>
                        <Image
                          src={`${SWIGGY_CAROUSAL_IMG_URL}${data.imageId}`}
                          alt=""
                          width={425}
                          height={252}
                          className="w-[425px] min-w-[425px] h-[252px]"
                        />
                      </figure>
                    );
                  }
                )}
            </div>
          </div>
          {/* End Best offers */}
          {/* Start Whats on your mind */}
          <div className="mt-8">
            <div className="flex justify-between items-center space-x-5">
              <h3 className="font-extrabold text-2xl">
                {swiggyData?.data?.cards[1].card.card.header.title}
              </h3>
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  onClick={() => {
                    if (whatsOnYourMindScrollRef.current) {
                      whatsOnYourMindScrollRef.current.scrollLeft -= 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (whatsOnYourMindScrollRef.current) {
                      whatsOnYourMindScrollRef.current.scrollLeft += 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={whatsOnYourMindScrollRef}
              className="mt-4 flex items-center space-x-5 overflow-hidden overflow-x-auto scrollbar-none"
            >
              {swiggyData &&
                swiggyData.data &&
                swiggyData.data.cards[1].card.card.gridElements.infoWithStyle.info.map(
                  (data: any) => {
                    return (
                      <figure key={Math.random()}>
                        <Image
                          src={`${SWIGGY_WHATS_ON_MIND_IMG_URL}${data.imageId}`}
                          alt=""
                          width={144}
                          height={180}
                          className="w-36 min-w-[144px] h-44"
                        />
                      </figure>
                    );
                  }
                )}
            </div>
          </div>
          {/* End Whats on your mind */}
          {/* Start Divider */}
          <div className="w-[99%] h-0.5 bg-gray-200 mt-10" />
          {/* End Divider */}
          {/* Start top restaurant chain */}
          <div className="mt-10">
            <div className="flex justify-between items-center space-x-5">
              <h3 className="font-extrabold text-2xl">
                {swiggyData?.data?.cards[2].card.card.header.title}
              </h3>
              <div className="flex items-center space-x-5">
                <button
                  type="button"
                  onClick={() => {
                    if (topRestaurantChainScrollRef.current) {
                      topRestaurantChainScrollRef.current.scrollLeft -= 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (topRestaurantChainScrollRef.current) {
                      topRestaurantChainScrollRef.current.scrollLeft += 600;
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-gray-300 flex justify-center items-center"
                >
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div
              ref={topRestaurantChainScrollRef}
              className="mt-6 flex items-center space-x-8 overflow-hidden overflow-x-auto scrollbar-none"
            >
              {swiggyData &&
                swiggyData.data &&
                swiggyData.data.cards[2].card.card.gridElements.infoWithStyle.restaurants.map(
                  (data: any) => {
                    return (
                      <div
                        className="w-72 h-full hover:scale-95 transition-transform"
                        key={Math.random()}
                      >
                        <figure className="w-72 h-48 relative rounded-xl overflow-hidden">
                          <Image
                            src={`${SWIGGY_RESTAURANT_LISTING_IMG_URL}${data.info.cloudinaryImageId}`}
                            alt={data.info.name}
                            width={312}
                            height={312}
                            className="w-full h-full object-cover"
                          />
                          <figcaption className="absolute left-0 right-0 bottom-0 flex items-end px-3 py-1 h-20 bg-linear-black-to-white">
                            <p className="w-full font-extrabold text-xl text-white">
                              {data.info.aggregatedDiscountInfoV3
                                ? `${
                                    data.info.aggregatedDiscountInfoV3.header
                                  } ${
                                    data.info.aggregatedDiscountInfoV3
                                      .subHeader || ""
                                  }`
                                : ""}
                            </p>
                          </figcaption>
                        </figure>
                        <div className="mt-3 px-2">
                          <h4 className="font-semibold text-xl text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <figure>
                              <Image
                                src="/images/rating_logo.svg"
                                alt="rating"
                                width={20}
                                height={20}
                              />
                            </figure>
                            <p className="font-medium text-lg">
                              {data.info.avgRatingString}
                            </p>
                          </div>
                          <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.cuisines.map(
                              (cuisine: string) => `${cuisine}, `
                            )}
                          </p>
                          <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.areaName}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          {/* End top restaurant chain */}
          {/* Start Divider */}
          <div className="w-[99%] h-0.5 bg-gray-200 mt-10" />
          {/* End Divider */}
          {/* Start Restaurants with online food delivery */}
          <div className="mt-10">
            <h3 className="font-extrabold text-2xl">
              {swiggyData?.data?.cards[3].card.card.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
              {swiggyData &&
                swiggyData.data &&
                swiggyData.data.cards[5].card.card.gridElements.infoWithStyle.restaurants.map(
                  (data: any) => {
                    return (
                      <div
                        className="hover:scale-95 transition-transform"
                        key={Math.random()}
                      >
                        <figure className="w-full h-56 relative rounded-xl overflow-hidden">
                          <Image
                            src={`${SWIGGY_RESTAURANT_LISTING_IMG_URL}${data.info.cloudinaryImageId}`}
                            alt={data.info.name}
                            width={312}
                            height={312}
                            className="w-full h-full object-cover"
                          />
                          <figcaption className="absolute left-0 right-0 bottom-0 flex items-end px-3 py-1 h-20 bg-linear-black-to-white">
                            <p className="w-full font-extrabold text-xl text-white">
                              {data.info.aggregatedDiscountInfoV3
                                ? `${
                                    data.info.aggregatedDiscountInfoV3.header ||
                                    ""
                                  } ${
                                    data.info.aggregatedDiscountInfoV3
                                      .subHeader || ""
                                  }`
                                : ""}
                            </p>
                          </figcaption>
                        </figure>
                        <div className="mt-3 px-2">
                          <h4 className="font-semibold text-xl text-gray-700 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.name}
                          </h4>
                          <div className="flex items-center space-x-1">
                            <figure>
                              <Image
                                src="/images/rating_logo.svg"
                                alt="rating"
                                width={20}
                                height={20}
                              />
                            </figure>
                            <p className="font-medium text-lg">
                              {data.info.avgRatingString}
                            </p>
                          </div>
                          <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.cuisines.map(
                              (cuisine: string) => `${cuisine}, `
                            )}
                          </p>
                          <p className="font-light text-base text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            {data.info.areaName}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
            </div>
          </div>
          {/* End Restaurants with online food delivery */}
        </div>
      </div>
    </div>
  );
}
export default Home;
