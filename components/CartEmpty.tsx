import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function CartEmpty() {
  const router = useRouter();
  return (
    <div className="flex-grow flex justify-center items-center p-5 mb-16 lg:mb-0">
      <div className="flex flex-col items-center">
        <figure>
          <Image
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt="Cart Empty"
            width={300}
            height={300}
          />
        </figure>
        <p className="font-bold text-gray-700 text-2xl mt-5 text-center">
          Your cart is empty
        </p>
        <p className="font-medium text-gray-500 text-base mt-2 text-center">
          You can go to home page to view more restaurants
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-orange-500 px-6 py-2 text-white mt-6"
        >
          SEE RESTAURANTS NEAR YOU
        </button>
      </div>
    </div>
  );
}

export default CartEmpty;
