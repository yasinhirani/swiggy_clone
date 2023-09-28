import Image from "next/image";
import React from "react";

function SkeletonHomepageLoading() {
  return (
    <div className="w-full mt-20 flex-grow">
      <div className="w-full bg-gray-900 flex flex-col justify-center items-center h-80 space-y-10">
        <div className="loader animate-spin absolute top-48" />
        <figure>
          <Image
            src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
            alt="Ice Cream"
            width={35}
            height={35}
          />
        </figure>
        <p className="font-light text-3xl text-white">
          Looking for great food near you ...
        </p>
      </div>
      <div className="w-full max-w-[76rem] mx-auto flex lg:space-x-8">
        {/* Start Sidebar Skeleton loading */}
        <div className="w-72 min-w-[288px] bg-white py-8 shadow-md space-y-3 hidden lg:block">
          {new Array(6).fill(0).map((_, index) => {
            return (
              <div
                key={Math.random()}
                className={`${
                  index === 0 ? "bg-gray-100" : ""
                } p-4 flex items-center space-x-6`}
              >
                <div
                  className={`w-10 h-10 rounded-full ${
                    index === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                />
                <div
                  className={`w-36 h-3 ${
                    index === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            );
          })}
        </div>
        {/* End Sidebar Skeleton loading */}
        {/* Start Card Skeleton loading */}
        <div className="flex-grow px-5 lg:px-0 py-8">
          <div className="w-36 h-3 bg-gray-200 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {new Array(6).fill(0).map(() => {
              return (
                <div key={Math.random()} className="space-y-3">
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="w-36 h-3 bg-gray-200" />
                  <div className="w-28 h-3 bg-gray-200" />
                </div>
              );
            })}
          </div>
        </div>
        {/* End Card Skeleton loading */}
      </div>
    </div>
  );
}

export default SkeletonHomepageLoading;
