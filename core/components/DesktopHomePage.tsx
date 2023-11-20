"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import AppDownload from "@/components/AppDownload";
import RestaurantCard from "@/components/RestaurantCard";
import TopRestaurantCard from "@/components/TopRestaurantCard";
import {
  SWIGGY_CAROUSAL_IMG_URL,
  SWIGGY_WHATS_ON_MIND_IMG_URL
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { IState } from "@/shared/model/state.mode";
import SkeletonHomepageLoading from "./SkeletonHomepageLoading";
import SwiggyUnserviceable from "./SwiggyUnserviceable";

function DesktopHomePage() {
  const router = useRouter();

  const locationState = useSelector((state: IState) => state.location);

  const bestOffersScrollRef = useRef<HTMLDivElement>(null);
  const whatsOnYourMindScrollRef = useRef<HTMLDivElement>(null);
  const topRestaurantChainScrollRef = useRef<HTMLDivElement>(null);
  const [swiggyData, setSwiggyData] = useState<any>(null);
  const [swiggyMappingData, setSwiggyMappingData] = useState<any>(null);
  const [restaurantList, setRestaurantList] = useState<Array<any>>([]);
  const [filterList, setFilterList] = useState<Array<any>>([]);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any>({});

  const getSwiggyData = () => {
    if (locationState) {
      swiggyServices
        .getHomePageData(
          locationState.geometry.location.lat.toString(),
          locationState.geometry.location.lng.toString()
        )
        .then((res) => {
          const data = {
            bannerOffers:
              res.data.data.cards[0].card.card.gridElements.infoWithStyle.info,
            whatsOnYourMind:
              res.data.data.cards[1].card.card.gridElements.infoWithStyle.info,
            topRestaurants:
              res.data.data.cards[2].card.card.gridElements.infoWithStyle
                .restaurants,
            restaurants:
              res.data.data.cards[5].card.card.gridElements.infoWithStyle
                .restaurants
          };
          setSwiggyData(res.data);
          setSwiggyMappingData(data);
          setRestaurantList(data.restaurants);
          const updatedFilterList =
            res.data.data.cards[4].card.card.facetList.filter(
              (list: any) =>
                list.id !== "catalog_cuisines" && list.id !== "explore"
            );
          setFilterList(updatedFilterList);
        });
    }
  };

  const applyFilters = (filterId: string, facetInfoId: string) => {
    let copyAppliedFilterList = appliedFiltersList;
    if (Object.prototype.hasOwnProperty.call(copyAppliedFilterList, filterId)) {
      const newObj: any = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const key in copyAppliedFilterList) {
        if (
          key !== filterId &&
          Object.prototype.hasOwnProperty.call(copyAppliedFilterList, key)
        ) {
          newObj[key] = copyAppliedFilterList[key];
        }
      }
      copyAppliedFilterList = newObj;
      setAppliedFiltersList(copyAppliedFilterList);
    } else {
      copyAppliedFilterList[filterId] = [{ value: facetInfoId }];
      setAppliedFiltersList(copyAppliedFilterList);
    }
    const filterObj = {
      filters: {
        facets: copyAppliedFilterList,
        isFiltered: true
      },
      lat: locationState?.geometry.location.lat,
      lng: locationState?.geometry.location.lng,
      page_type: "DESKTOP_WEB_LISTING"
    };
    swiggyServices.update(filterObj).then((res) => {
      const updatedFilterList =
        res.data.data.cards[0].card.card.facetList.filter(
          (list: any) => list.id !== "catalog_cuisines" && list.id !== "explore"
        );
      setFilterList(updatedFilterList);
      setRestaurantList(
        res.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants
      );
    });
  };

  useEffect(() => {
    if (locationState) {
      setSwiggyData(null);
      getSwiggyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState.place_id]);

  if (!swiggyData) {
    return <SkeletonHomepageLoading />;
  }

  if (
    swiggyData &&
    swiggyData.data.cards[0].card.card.id === "swiggy_not_present"
  ) {
    return <SwiggyUnserviceable swiggyData={swiggyData} />;
  }
  return (
    <div className="mt-20">
      {swiggyData !== null && (
        <>
          <div className="w-full max-w-[92rem] mx-auto px-6 py-7">
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
                {swiggyMappingData !== null &&
                  swiggyMappingData.bannerOffers.map((data: any) => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          if (data.action.link.includes("menu")) {
                            router.push(
                              `/restaurant?name=&restaurantId=${data.entityId}`
                            );
                          } else if (
                            data.action.link.includes("collection_id")
                          ) {
                            const url = new URL(data.action.link);
                            const collectionId =
                              url.searchParams.get("collection_id");
                            if (collectionId) {
                              router.push(
                                `/collections?collectionId=${collectionId}`
                              );
                            } else {
                              const entityId = data.entityId.split("/");
                              router.push(
                                `/collections?collectionId=${
                                  entityId[entityId.length - 1]
                                }`
                              );
                            }
                          }
                        }}
                        key={data.id}
                      >
                        <figure>
                          <Image
                            src={`${SWIGGY_CAROUSAL_IMG_URL}${data.imageId}`}
                            alt=""
                            width={425}
                            height={252}
                            className="w-[425px] min-w-[425px] h-[252px]"
                          />
                        </figure>
                      </button>
                    );
                  })}
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
                {swiggyMappingData !== null &&
                  swiggyMappingData.whatsOnYourMind.map((data: any) => {
                    return (
                      <button
                        type="button"
                        onClick={() => {
                          const url = new URL(data.action.link);
                          const collectionId =
                            url.searchParams.get("collection_id");
                          router.push(
                            `/collections?collectionId=${collectionId}`
                          );
                        }}
                        key={data.id}
                      >
                        <figure>
                          <Image
                            src={`${SWIGGY_WHATS_ON_MIND_IMG_URL}${data.imageId}`}
                            alt=""
                            width={144}
                            height={180}
                            className="w-36 min-w-[144px] h-44"
                          />
                        </figure>
                      </button>
                    );
                  })}
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
                {swiggyMappingData !== null &&
                  swiggyMappingData.topRestaurants.map((data: any) => {
                    return <TopRestaurantCard key={data.info.id} data={data} />;
                  })}
              </div>
            </div>
            {/* End top restaurant chain */}
            {/* Start Divider */}
            <div className="w-[99%] h-0.5 bg-gray-200 mt-10" />
            {/* End Divider */}
            {/* Start Restaurants with online food delivery */}
            <div className="mt-10 space-y-6">
              <h3 className="font-extrabold text-2xl">
                {swiggyData?.data?.cards[3].card.card.title}
              </h3>
              {/* Start Filter list */}
              <div className="flex items-center space-x-3 overflow-hidden overflow-x-auto">
                {filterList.length > 0 &&
                  filterList.map((list) => {
                    return (
                      <button
                        type="button"
                        key={list.id}
                        onClick={() =>
                          applyFilters(list.id, list.facetInfo[0].id)
                        }
                        className={`font-light text-gray-500 text-base flex items-center space-x-2 border ${
                          Object.prototype.hasOwnProperty.call(
                            list.facetInfo[0],
                            "selected"
                          ) && list.facetInfo[0].selected
                            ? "bg-gray-200 border-gray-800"
                            : "border-gray-200"
                        } rounded-3xl px-3 py-1.5 whitespace-nowrap`}
                      >
                        <span>{list.facetInfo[0].label}</span>
                        {Object.prototype.hasOwnProperty.call(
                          list.facetInfo[0],
                          "selected"
                        ) &&
                          list.facetInfo[0].selected && (
                            <span>
                              <XMarkIcon className="w-5 h-5" />
                            </span>
                          )}
                      </button>
                    );
                  })}
              </div>
              {/* End Filter list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {swiggyData !== null &&
                  restaurantList.length > 0 &&
                  restaurantList.map((data: any) => {
                    return <RestaurantCard key={data.info.id} data={data} />;
                  })}
              </div>
            </div>
            {/* End Restaurants with online food delivery */}
          </div>
          <AppDownload swiggyData={swiggyData} swiggyPresent />
        </>
      )}
    </div>
  );
}
export default DesktopHomePage;
