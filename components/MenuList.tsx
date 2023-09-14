import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import FoodItemCard from "./FoodItemCard";

function MenuList({ menu, isVegOnlySelected }: any) {
  const [isMenuListOpen, setIsMenuListOpen] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<Array<any>>(menu.itemCards);

  useEffect(() => {
    if (isVegOnlySelected) {
      const filteredItems = [...menu.itemCards].filter((item) =>
        item.card.info.hasOwnProperty("isVeg")
      );
      setMenuItems(filteredItems);
    } else {
      setMenuItems(menu.itemCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVegOnlySelected]);
  return (
    <>
      {menu.itemCards && menuItems.length > 0 && (
        <div className="bg-white px-2 py-4">
          <div
            role="button"
            onClick={() => setIsMenuListOpen(!isMenuListOpen)}
            className="flex justify-between items-center"
          >
            <p className="font-extrabold text-lg text-gray-800">{`${menu.title} (${menuItems.length})`}</p>
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
            {menuItems.map((items: any, index: number) => {
              return (
                <div key={Math.random()}>
                  <FoodItemCard foodData={items.card.info} />
                  {index < menu.itemCards.length - 1 && (
                    <hr className="mt-8 mb-4 border-gray-300" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MenuList;
