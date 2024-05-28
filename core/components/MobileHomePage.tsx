"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import swiggyServices from "@/shared/service/swiggy.service";
import { SWIGGY_CAROUSAL_MOBILE_IMG_URL } from "@/core/utils/common";
import RestaurantCard from "@/components/RestaurantCard";
import AppDownload from "@/components/AppDownload";
import { IState } from "@/shared/model/state.mode";
import SkeletonHomepageLoading from "./SkeletonHomepageLoading";
import SwiggyUnserviceable from "./SwiggyUnserviceable";

function MobileHomePage() {
  const router = useRouter();

  const locationState = useSelector((state: IState) => state.location);

  const bestOffersScrollRef = useRef<HTMLDivElement>(null);
  const [swiggyData, setSwiggyData] = useState<any>(null);
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
          setSwiggyData(res.data);
          if(res.data.data.cards[0].card.card.id === "swiggy_not_present") return;
          setRestaurantList(
            res.data.data.cards[2].card.card.gridElements.infoWithStyle
              .restaurants
          );
          const updatedFilterList =
            res.data.data.cards[1].card.card.facetList.filter(
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
    window.scrollTo(0, 0);
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
    <div className="mt-20 flex-grow flex flex-col">
      {swiggyData !== null && (
        <div className="mb-16 lg:mb-0 flex-grow flex flex-col">
          <div className="w-full max-w-[92rem] mx-auto flex-grow px-6 py-7">
            {/* Start Best offers */}
            {false && (
              <div>
                <div className="flex justify-between items-center space-x-5">
                  <h3 className="font-extrabold text-2xl">
                    Best offers for you
                  </h3>
                  <div className="flex items-center space-x-5">
                    <button
                      type="button"
                      onClick={() => {
                        if (bestOffersScrollRef.current) {
                          bestOffersScrollRef.current.scrollLeft -= 400;
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
                          bestOffersScrollRef.current.scrollLeft += 400;
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
                  {swiggyData !== null &&
                    swiggyData.data &&
                    swiggyData.data.cards[0].card.card.gridElements.infoWithStyle.info.map(
                      (data: any) => {
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
                                src={`${SWIGGY_CAROUSAL_MOBILE_IMG_URL}${data.imageId}`}
                                alt=""
                                width={400}
                                height={220}
                                className="w-[320px] min-w-[320px] h-[200px]"
                              />
                            </figure>
                          </button>
                        );
                      }
                    )}
                </div>
              </div>
            )}
            {/* End Best offers */}
            {/* Start Restaurants with online food delivery */}
            <div className="mt-10 space-y-6">
              <h3 className="font-extrabold text-2xl">
                {swiggyData?.data?.cards[0].card.card.title}
              </h3>
              {/* Start Filter list */}
              <div className="flex items-center space-x-3 overflow-hidden overflow-x-auto scrollbar-none">
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
        </div>
      )}
    </div>
  );
}
export default MobileHomePage;
