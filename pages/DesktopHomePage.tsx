"use client";
import AppDownload from "@/components/AppDownload";
import RestaurantCard from "@/components/RestaurantCard";
import TopRestaurantCard from "@/components/TopRestaurantCard";
import { LocationContext } from "@/core/context";
import {
  SWIGGY_CAROUSAL_IMG_URL,
  SWIGGY_WHATS_ON_MIND_IMG_URL,
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useContext } from "react";

function DesktopHomePage() {
  const { locationInfo } = useContext(LocationContext);
  const router = useRouter();
  const bestOffersScrollRef = useRef<HTMLDivElement>(null);
  const whatsOnYourMindScrollRef = useRef<HTMLDivElement>(null);
  const topRestaurantChainScrollRef = useRef<HTMLDivElement>(null);
  const [swiggyData, setSwiggyData] = useState<any>(null);

  const getSwiggyData = () => {
    if (locationInfo) {
      swiggyServices
        .getHomePageData(
          locationInfo.geometry.location.lat.toString(),
          locationInfo.geometry.location.lng.toString()
        )
        .then((res) => {
          console.log(res.data);
          setSwiggyData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
      {swiggyData !== null &&
      swiggyData.data.cards[0].card.card.id === "swiggy_not_present" ? (
        <div className="mt-20">
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
            <div className="grid grid-cols-4 gap-10 mt-4">
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
        <div className="mt-20">
          {swiggyData !== null && (
            <>
              <div className="w-full max-w-[92rem] mx-auto px-6 py-7">
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
                              key={Math.random()}
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
                    {swiggyData !== null &&
                      swiggyData.data &&
                      swiggyData.data.cards.length > 0 &&
                      swiggyData.data.cards[1].card.card.gridElements.infoWithStyle.info.map(
                        (data: any) => {
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
                              key={Math.random()}
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
                    {swiggyData !== null &&
                      swiggyData.data &&
                      swiggyData.data.cards[2].card.card.gridElements.infoWithStyle.restaurants.map(
                        (data: any) => {
                          return (
                            <TopRestaurantCard
                              key={Math.random()}
                              data={data}
                            />
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
                    {swiggyData !== null &&
                      swiggyData.data &&
                      swiggyData.data.cards[5].card.card.gridElements.infoWithStyle.restaurants.map(
                        (data: any) => {
                          return (
                            <RestaurantCard key={Math.random()} data={data} />
                          );
                        }
                      )}
                  </div>
                </div>
                {/* End Restaurants with online food delivery */}
              </div>
              <AppDownload swiggyData={swiggyData} swiggyPresent />
            </>
          )}
        </div>
      )}
    </>
  );
}
export default DesktopHomePage;
