"use client";
import MenuList from "@/components/MenuList";
import { CartContext, CartTotalContext, LocationContext } from "@/core/context";
import {
  SWIGGY_FSSAI_IMG_URL,
  SWIGGY_OFFER_GENERIC_LOGO_URL,
  SWIGGY_OFFER_LOGO_URL,
} from "@/core/utils/common";
import swiggyServices from "@/shared/service/swiggy.service";
import cartTotal from "@/shared/utils/cartTotal";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useContext, useState } from "react";

function Restaurant() {
  const { locationInfo } = useContext(LocationContext);
  const { CartData, SetCartData } = useContext(CartContext);
  const { CartTotal, setCartTotal } = useContext(CartTotalContext);
  const searchParams = useSearchParams();
  const restaurantId = searchParams?.get("restaurantId");
  const router = useRouter();

  const [restaurantData, setRestaurantData] = useState<Array<any>>([]);
  const [restaurantMenu, setRestaurantMenu] = useState<Array<any>>([]);
  const [menuList, setMenuList] = useState<Array<any>>([]);
  const [cartItem, setCartItem] = useState<ICartItems | null>(null);
  const [vegOnlySelected, setVegOnlySelected] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);
  const [menuViewCartFooterVisible, setMenuViewCartFooterVisible] =
    useState<boolean>(CartData.Items.length > 0);

  const getRestaurantMenu = () => {
    if (restaurantId && locationInfo) {
      swiggyServices
        .getRestaurantMenu(
          restaurantId,
          locationInfo.geometry.location.lat.toString(),
          locationInfo.geometry.location.lng.toString()
        )
        .then((res) => {
          setRestaurantData(res.data.data.cards);
          let menu = [];
          if (res.data.data.cards[2]?.card?.card?.hasOwnProperty("tabs")) {
            menu =
              res.data.data.cards[3].groupedCard.cardGroupMap.REGULAR.cards;
          } else {
            menu =
              res.data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
          }
          if (menu[1].card.card.hasOwnProperty("carousel")) {
            setMenuList(menu.slice(2, menu.length - 2));
          } else {
            setMenuList(menu.slice(1, menu.length - 2));
          }
          setRestaurantMenu(menu);
        });
    }
  };

  const resetCartForNewOrder = () => {
    SetCartData({ Items: [], RestaurantDetails: null });
    if (cartItem) {
      addToCart(
        cartItem.ItemId,
        cartItem.IsVeg,
        cartItem.ItemName,
        cartItem.Price,
        true
      );
    }
    setInfoModalVisible(false);
  };

  const addToCart = (
    itemId: string,
    isVeg: boolean,
    itemName: string,
    price: number,
    isAfreshStart: boolean
  ) => {
    let copyCart = [...CartData.Items];
    let itemToAdd: ICartItems = {
      ItemId: itemId,
      IsVeg: isVeg,
      ItemName: itemName,
      Price: price,
      Quantity: 1,
      Total: price,
    };
    setCartItem(itemToAdd);
    // Start Add initial Product and restaurant details to cart
    if (copyCart.length === 0 || isAfreshStart) {
      const restaurantDetails: ICartRestaurantDetails = {
        RestaurantId: restaurantId || "",
        RestaurantImage: restaurantData[0].card.card.info.cloudinaryImageId,
        RestaurantLocation: restaurantData[0].card.card.info.areaName,
        RestaurantName: restaurantData[0].card.card.info.name,
      };
      copyCart = [];
      copyCart.push(itemToAdd);
      SetCartData({
        RestaurantDetails: restaurantDetails,
        Items: copyCart,
      });
      return;
    }
    // End Add initial Product and restaurant details to cart
    // Start check if restaurant is same or different
    if (CartData.RestaurantDetails?.RestaurantId !== restaurantId) {
      setInfoModalVisible(true);
      return;
    }
    // End check if restaurant is same or different
    // Start add/update to cart if same restaurant
    const itemIndex = copyCart.findIndex((item) => item.ItemId === itemId);
    if (itemIndex === -1) {
      copyCart.push(itemToAdd);
      SetCartData({
        Items: copyCart,
        RestaurantDetails: CartData.RestaurantDetails,
      });
    } else {
      copyCart[itemIndex].Quantity = copyCart[itemIndex].Quantity + 1;
      copyCart[itemIndex].Total =
        copyCart[itemIndex].Quantity * copyCart[itemIndex].Price;
      SetCartData({
        Items: copyCart,
        RestaurantDetails: CartData.RestaurantDetails,
      });
    }
    // End add/update to cart if same restaurant
  };

  useEffect(() => {
    getRestaurantMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, locationInfo]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }
    localStorage.setItem("cartData", JSON.stringify(CartData));
    setCartTotal(cartTotal(CartData));
    setMenuViewCartFooterVisible(CartData.Items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartData]);
  return (
    <div className="mt-20 flex-grow flex flex-col relative">
      {restaurantData.length > 0 && (
        <div className="w-full max-w-[50rem] mx-auto flex-grow px-6 py-10 mb-16 lg:mb-0">
          <p className="font-normal text-xs text-gray-500">
            <Link href="/">Home</Link>/{" "}
            {locationInfo?.address_components[0].long_name} /{" "}
            {restaurantData[0].card.card.info.name}
          </p>
          {/* Start Restaurant details */}
          <div className="mt-10 flex justify-between items-center space-x-5">
            <div>
              <h2 className="font-bold text-2xl mb-1 text-gray-800">
                {restaurantData[0].card.card.info.name}
              </h2>
              <p className="font-normal text-sm text-gray-500">
                {restaurantData[0].card.card.info.cuisines.join(", ")}
              </p>
              <p className="font-normal text-sm text-gray-500">
                {restaurantData[0].card.card.info.areaName}
                {", "}
                {restaurantData[0].card.card.info.sla.lastMileTravelString}
              </p>
            </div>
            <div className="border border-gray-200 rounded-md p-2 flex flex-col items-center">
              <div className="flex items-center space-x-1">
                <figure>
                  <Image
                    src="/images/rating_logo.svg"
                    alt="rating"
                    width={15}
                    height={15}
                  />
                </figure>
                <p className="font-bold text-sm text-green-600">
                  {restaurantData[0].card.card.info.avgRatingString}
                </p>
              </div>
              <div className="w-full h-0.5 bg-gray-200 my-2" />
              <p className="font-bold text-xs text-gray-400">
                {restaurantData[0].card.card.info.totalRatingsString}
              </p>
            </div>
          </div>
          {/* End Restaurant details */}
          {/* Start Distance text */}
          <p className="font-normal text-sm text-gray-500 mt-4">
            {restaurantData[0].card.card.info.feeDetails.message}
          </p>
          {/* End Distance text */}
          {/* Start Divider */}
          <hr className="border-dashed border-gray-300 my-5" />
          {/* End Divider */}
          {/* Start time and currency */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <figure>
                <Image
                  src="/images/minutes_for_delivery.svg"
                  alt="Delivery Time"
                  width={20}
                  height={20}
                />
              </figure>
              <p className="font-extrabold text-lg text-gray-800">
                {restaurantData[0].card.card.info.sla.slaString}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <figure>
                <Image
                  src="/images/rupees.svg"
                  alt="Delivery Time"
                  width={20}
                  height={20}
                />
              </figure>
              <p className="font-extrabold text-lg text-gray-800">
                {restaurantData[0].card.card.info.costForTwoMessage}
              </p>
            </div>
          </div>
          {/* End time and currency */}
          {/* Start Offers */}
          <div className="mt-5 flex items-center space-x-4 overflow-hidden overflow-x-auto scrollbar-none">
            {restaurantData[1].card.card.gridElements.infoWithStyle.offers.map(
              (offer: any) => {
                return (
                  <div
                    key={offer.info.offerIds[0]}
                    className="border border-gray-200 rounded-md pl-2 pr-8 py-2 flex flex-col items-start"
                  >
                    <div className="flex items-center space-x-2">
                      <figure>
                        <Image
                          src={
                            offer.info.offerLogo === "offers/generic"
                              ? SWIGGY_OFFER_GENERIC_LOGO_URL
                              : `${SWIGGY_OFFER_LOGO_URL}${offer.info.offerLogo}`
                          }
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 min-w-[20px]"
                        />
                      </figure>
                      <p className="font-bold text-gray-600 whitespace-nowrap">
                        {offer.info.header}
                      </p>
                    </div>
                    {offer.info.couponCode && offer.info.description && (
                      <p className="font-semibold text-xs text-gray-500 whitespace-nowrap">
                        {offer.info.couponCode} | {offer.info.description}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
          {/* End Offers */}
          {/* Start pure veg, veg and non-veg heading */}
          <div className="mt-10 flex items-center space-x-5">
            <p className="font-bold text-base text-gray-800">
              {restaurantMenu[0].card.card?.isPureVeg ? "Pure Veg" : "Veg Only"}
            </p>
            {!restaurantMenu[0].card.card?.isPureVeg && (
              <div
                role="button"
                onClick={() => setVegOnlySelected(!vegOnlySelected)}
                className={`w-9 ${
                  vegOnlySelected ? "bg-green-700" : "bg-gray-200"
                } h-[18px] relative rounded`}
              >
                <div
                  className={`absolute top-0.5 bottom-0.5 transition-all ${
                    vegOnlySelected ? "right-0.5" : "left-0.5"
                  } w-4 bg-white rounded`}
                />
              </div>
            )}
          </div>
          {/* End pure veg, veg and non-veg heading */}
          {/* Start Divider */}
          <hr className="border-gray-300 my-4" />
          {/* End Divider */}
          {/* Start Menu Listing */}
          <div className="space-y-3 bg-gray-200 pb-20">
            {menuList
              .filter((menu) => menu.card.card.hasOwnProperty("itemCards"))
              .map((menu) => {
                return (
                  <MenuList
                    key={Math.random()}
                    menu={menu.card.card}
                    isVegOnlySelected={vegOnlySelected}
                    addToCart={addToCart}
                  />
                );
              })}
            {/* Start License Info and restaurant info */}
            <div className="px-3 pb-4">
              <div className="flex items-center space-x-5">
                <figure>
                  <Image
                    src={SWIGGY_FSSAI_IMG_URL}
                    alt="FSSAI"
                    width={70}
                    height={70}
                  />
                </figure>
                <p className="font-normal text-sm text-gray-500">
                  {restaurantMenu[restaurantMenu.length - 2].card.card.text[0]}
                </p>
              </div>
              <hr className="my-4 border-gray-400" />
              <div>
                <p className="font-bold text-base text-gray-500">
                  {restaurantMenu[restaurantMenu.length - 1].card.card.name}
                </p>
                <p className="font-normal text-sm text-gray-400">
                  (Outlet:
                  {restaurantMenu[restaurantMenu.length - 1].card.card.area})
                </p>
                <p className="font-medium text-xs text-gray-400 flex items-end mt-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span>
                    {
                      restaurantMenu[restaurantMenu.length - 1].card.card
                        .completeAddress
                    }
                  </span>
                </p>
              </div>
            </div>
            {/* End License Info and restaurant info */}
          </div>
          {/* End Menu Listing */}
        </div>
      )}
      {/* Start Modal for info for item already in cart */}
      <div
        className={`fixed ${
          infoModalVisible ? "bottom-0 sm:bottom-8" : "-bottom-full"
        } left-1/2 transform -translate-x-1/2 bg-white p-6 z-30 w-full max-w-[500px] min-w-[300px] info-modal`}
      >
        <h2 className="font-bold text-2xl text-gray-700">
          Items already in cart
        </h2>
        <p className="font-normal text-sm text-gray-500 mt-2">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
        <div className="flex items-center space-x-5 mt-5">
          <button
            type="button"
            onClick={() => setInfoModalVisible(false)}
            className="w-full border border-[#60b246] text-[#60b246] px-4 py-2 uppercase text-sm sm:text-base"
          >
            No
          </button>
          <button
            type="button"
            onClick={() => resetCartForNewOrder()}
            className="w-full border border-[#60b246] bg-[#60b246] text-white px-4 py-2 uppercase text-sm sm:text-base"
          >
            yes, start afresh
          </button>
        </div>
      </div>
      {/* End Modal for info for item already in cart */}
      {/* Start Item added to cart info */}
      <div
        role="button"
        className={`w-full max-w-[50rem] mx-auto p-3 fixed ${
          menuViewCartFooterVisible && restaurantData
            ? "bottom-16 lg:bottom-4"
            : "-bottom-full"
        } left-1/2 right-1/2 transform -translate-x-1/2 transition-all bg-[#60b246] flex justify-between items-center`}
        onClick={() => router.push("/checkout")}
      >
        <p className="font-bold text-sm text-white">
          {CartData.Items.length} {CartData.Items.length > 1 ? "Items" : "Item"}{" "}
          | ₹{CartTotal}
        </p>
        <p className="font-bold text-base text-white">VIEW CART</p>
      </div>
      {/* Start Item added to cart info */}
    </div>
  );
}

export default Restaurant;
