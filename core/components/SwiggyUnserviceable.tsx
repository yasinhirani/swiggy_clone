import React from "react";
import Image from "next/image";
import AppDownload from "@/components/AppDownload";

function SwiggyUnserviceable({ swiggyData }: any) {
  return (
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
                  key={city.text}
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
  );
}

export default SwiggyUnserviceable;
