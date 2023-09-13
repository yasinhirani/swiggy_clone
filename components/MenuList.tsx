import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import FoodItemCard from "./FoodItemCard";

function MenuList({ menu }: any) {
  const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(true);
  return (
    <>
      {menu.itemCards && menu.itemCards.length > 0 && (
        <div className="bg-white px-2 py-4">
          <div
            role="button"
            onClick={() => setIsMenuListOpen(!isMenuListOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-extrabold text-lg text-gray-800">{`${menu.title} (${menu.itemCards.length})`}</p>
            <ChevronDownIcon
              className={`w-5 h-5 ${
                isMenuListOpen ? "rotate-180" : "rotate-0"
              } transition-transform`}
            />
          </div>
          <div
            className={`${
              isMenuListOpen ? "h-auto mt-3 " : "h-0"
            } overflow-hidden`}
          >
            {menu.itemCards.map((items: any, index: number) => {
              return (
                <>
                  <FoodItemCard
                    key={Math.random()}
                    foodData={items.card.info}
                  />
                  {index < menu.itemCards.length - 1 && (
                    <hr className="mt-8 mb-4 border-gray-300" />
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuList;
