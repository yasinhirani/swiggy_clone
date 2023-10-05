import { SWIGGY_APP_STORE_IMG_URL } from "@/core/utils/common";
import Image from "next/image";
import React from "react";

function AppDownload({ swiggyData, swiggyPresent }: any) {
  const swiggyAppDownloadApiLocation: number = swiggyPresent ? 3 : 2;
  return (
    <div className="bg-gray-200 mt-5">
      <div className="w-full max-w-[70rem] mx-auto px-6 py-7 flex flex-col sm:flex-row justify-between sm:items-center sm:space-x-5 space-y-6 sm:space-y-0">
        <h4 className="font-extrabold text-2xl sm:text-3xl sm:w-[25ch] text-gray-800">
          {
            swiggyData.data.cards[
              swiggyData.data.cards.length - swiggyAppDownloadApiLocation
            ].card.card.title
          }
        </h4>
        <div className="flex items-center space-x-4">
          <a
            href={
              swiggyData.data.cards[
                swiggyData.data.cards.length - swiggyAppDownloadApiLocation
              ].card.card.androidAppLink
            }
            target="_blank"
          >
            <figure>
              <Image
                src={`${SWIGGY_APP_STORE_IMG_URL}${
                  swiggyData.data.cards[
                    swiggyData.data.cards.length - swiggyAppDownloadApiLocation
                  ].card.card.androidAppImage
                }`}
                alt="Swiggy Play Store"
                width={200}
                height={200}
              />
            </figure>
          </a>
          <a
            href={
              swiggyData.data.cards[
                swiggyData.data.cards.length - swiggyAppDownloadApiLocation
              ].card.card.iosAppLink
            }
            target="_blank"
          >
            <figure>
              <Image
                src={`${SWIGGY_APP_STORE_IMG_URL}${
                  swiggyData.data.cards[
                    swiggyData.data.cards.length - swiggyAppDownloadApiLocation
                  ].card.card.iosAppImage
                }`}
                alt="Swiggy Play Store"
                width={200}
                height={200}
              />
            </figure>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppDownload;
