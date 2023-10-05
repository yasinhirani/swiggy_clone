"use client";
import AppDownload from "@/components/AppDownload";
import RestaurantCard from "@/components/RestaurantCard";
import TopRestaurantCard from "@/components/TopRestaurantCard";
import { LocationContext } from "@/core/context";
import {
  SWIGGY_CAROUSAL_IMG_URL,
  SWIGGY_CAROUSAL_MOBILE_IMG_URL,
  SWIGGY_WHATS_ON_MIND_IMG_URL,
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useContext } from "react";
import SkeletonHomepageLoading from "./SkeletonHomepageLoading";

function MobileHomePage() {
  const { locationInfo } = useContext(LocationContext);
  const router = useRouter();
  const bestOffersScrollRef = useRef<HTMLDivElement>(null);
  const whatsOnYourMindScrollRef = useRef<HTMLDivElement>(null);
  const topRestaurantChainScrollRef = useRef<HTMLDivElement>(null);
  const [swiggyData, setSwiggyData] = useState<any>(null);
  const [restaurantList, setRestaurantList] = useState<Array<any>>([]);
  const [filterList, setFilterList] = useState<Array<any>>([]);
  const [appliedFiltersList, setAppliedFiltersList] = useState<any>({});

  const getSwiggyData = () => {
    if (locationInfo) {
      swiggyServices
        .getHomePageData(
          locationInfo.geometry.location.lat.toString(),
          locationInfo.geometry.location.lng.toString()
        )
        .then((res) => {
          setSwiggyData(res.data);
          setRestaurantList(
            res.data.data.cards[3].card.card.gridElements.infoWithStyle
              .restaurants
          );
          const updatedFilterList =
            res.data.data.cards[2].card.card.facetList.filter(
              (list: any) =>
                list.id !== "catalog_cuisines" && list.id !== "explore"
            );
          setFilterList(updatedFilterList);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const applyFilters = (filterId: string, facetInfoId: string) => {
    let copyAppliedFilterList = appliedFiltersList;
    if (copyAppliedFilterList.hasOwnProperty(filterId)) {
      let newObj: any = {};
      for (let key in copyAppliedFilterList) {
        if (key !== filterId && copyAppliedFilterList.hasOwnProperty(key)) {
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
        isFiltered: true,
      },
      lat: locationInfo?.geometry.location.lat,
      lng: locationInfo?.geometry.location.lng,
      page_type: "DESKTOP_WEB_LISTING",
    };
    swiggyServices.update(filterObj).then((res) => {
      console.log(res.data);
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
    if (locationInfo) {
      setSwiggyData(null);
      getSwiggyData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInfo]);
  return (
    <>
      {swiggyData !== null ? (
        swiggyData.data.cards[0].card.card.id === "swiggy_not_present" ? (
          <div className="mt-20 mb-16 lg:mb-0">
            <div className="w-full max-w-[25rem] mx-auto px-6 py-7 flex flex-col items-center mt-20">
              <figure>
                <Image
                  src={swiggyData.data.cards[0].card.card.imageLink}
                  alt={swiggyData.data.cards[0].card.card.title}
                  width={300}
                  height={300}
                />
              </figure>
              <h2 className="font-bold text-2xl mt-6 text-gray-800 text-center">
                {swiggyData.data.cards[0].card.card.title}
              </h2>
              <p className="font-light text-lg text-center text-gray-600 mt-1">
                We don’t have any services here till now. Try changing location.
              </p>
            </div>
            <div className="my-8 px-5">
              <h2 className="font-bold text-2xl mt-6 text-gray-800">
                {swiggyData.data.cards[1].card.card.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4">
                {swiggyData.data.cards[1].card.card.cities.map(
                  (city: { text: string; link: string }) => {
                    return (
                      <button
                        type="button"
                        key={Math.random()}
                        className="border border-gray-300 rounded-xl px-5 py-3 text-gray-800 last-of-type:col-span-full"
                      >
                        {city.text}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
            <AppDownload swiggyData={swiggyData} swiggyPresent={false} />
          </div>
        ) : (
          <div className="mt-20 flex-grow flex flex-col">
            {swiggyData !== null && (
              <div className="mb-16 lg:mb-0 flex-grow flex flex-col">
                <div className="w-full max-w-[92rem] mx-auto flex-grow px-6 py-7">
                  {/* Start Best offers */}
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
                                  } else {
                                    return;
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
                  {/* End Best offers */}
                  {/* Start Restaurants with online food delivery */}
                  <div className="mt-10 space-y-6">
                    <h3 className="font-extrabold text-2xl">
                      {swiggyData?.data?.cards[1].card.card.title}
                    </h3>
                    {/* Start Filter list */}
                    <div className="flex items-center space-x-3 overflow-hidden overflow-x-auto scrollbar-none">
                      {filterList.length > 0 &&
                        filterList.map((list) => {
                          return (
                            <button
                              key={list.id}
                              onClick={() =>
                                applyFilters(list.id, list.facetInfo[0].id)
                              }
                              className={`font-light text-gray-500 text-base flex items-center space-x-2 border ${
                                list.facetInfo[0].hasOwnProperty("selected") &&
                                list.facetInfo[0].selected
                                  ? "bg-gray-200 border-gray-800"
                                  : "border-gray-200"
                              } rounded-3xl px-3 py-1.5 whitespace-nowrap`}
                            >
                              <span>{list.facetInfo[0].label}</span>
                              {list.facetInfo[0].hasOwnProperty("selected") &&
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
                          return (
                            <RestaurantCard key={Math.random()} data={data} />
                          );
                        })}
                    </div>
                  </div>
                  {/* End Restaurants with online food delivery */}
                </div>
                <AppDownload swiggyData={swiggyData} swiggyPresent />
              </div>
            )}
          </div>
        )
      ) : (
        <SkeletonHomepageLoading />
      )}
    </>
  );
}
export default MobileHomePage;
