import Image from "next/image";
import React from "react";
import { SWIGGY_ONE_IMG_URL } from "@/core/utils/common";

function SwiggyOne() {
  return (
    <div className="flex items-start space-x-6">
      <div>
        <h2 className="font-extrabold text-xl text-gray-800 capitalize mb-2">
          Swiggy One
        </h2>
        <p className="font-light text-base sm:text-lg md:text-xl text-gray-500 mt-8">
          Get free delivery and extra discounts all across Swiggy.
        </p>
        <p className="font-light text-base sm:text-lg md:text-xl text-gray-500 mt-3">
          Your Swiggy One benefits can be availed only on the Swiggy App.
        </p>
        <div className="flex items-center space-x-4 mt-8">
          <a
            href="https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader"
            target="_blank"
            rel="noreferrer"
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
            rel="noreferrer"
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
      <figure className="hidden lg:block">
        <Image
          src={SWIGGY_ONE_IMG_URL}
          alt="Swiggy One"
          width={300}
          height={300}
        />
      </figure>
    </div>
  );
}

export default SwiggyOne;
