"use client";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState, useContext, useRef, useEffect } from "react";
import { debounce } from "lodash";
import swiggyServices from "@/shared/service/swiggy.service";
import { LocationContext } from "@/core/context";
import { SWIGGY_SEARCH_IMG_URL } from "@/core/utils/common";
import { useSearchParams, useRouter } from "next/navigation";
import SearchResults from "@/components/SearchResults";

function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { locationInfo } = useContext(LocationContext);
  const searchTextRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<Array<any> | null>(null);
  const [searchResultData, setSearchResultData] = useState<Array<any> | null>(
    null
  );
  const [searchResultDataTabs, setSearchResultDataTabs] =
    useState<Array<any> | null>(null);
  const [searchResultDataList, setSearchResultDataList] =
    useState<Array<any> | null>(null);

  const getSuggestions = debounce((searchText: string) => {
    if (searchText !== "" && locationInfo) {
      const lat = locationInfo.geometry.location.lat.toString();
      const lng = locationInfo.geometry.location.lng.toString();
      swiggyServices.getSuggestions(searchText, lat, lng).then((res) => {
        if (
          res.data.statusMessage !== "Invalid query string" &&
          res.data.data.suggestions.length > 0
        ) {
          setSuggestions(res.data.data.suggestions);
        } else {
          setSuggestions([]);
        }
      });
    } else {
      setSuggestions(null);
    }
  }, 500);

  const getSearchResults = (query: string) => {
    if (locationInfo) {
      const lat = locationInfo.geometry.location.lat.toString();
      const lng = locationInfo.geometry.location.lng.toString();
      swiggyServices.getSearchResults(query, lat, lng).then((res) => {
        setSearchResultData(res.data.data.cards);
        setSearchResultDataTabs(res.data.data.cards[0].card.card.tab);
        setSearchResultDataList(
          res.data.data.cards[1].groupedCard.cardGroupMap
        );
      });
    }
  };

  // const changeToRestaurantsFromDish = (query: string, selectedTab: string) => {
  //   if (locationInfo) {
  //     const lat = locationInfo.geometry.location.lat.toString();
  //     const lng = locationInfo.geometry.location.lng.toString();
  //     swiggyServices.changeSearchResults(query, lat, lng, selectedTab).then((res) => {
  //       setSearchResultData(res.data.data.cards);
  //       setSearchResultDataList(
  //         res.data.data.cards[0].groupedCard.cardGroupMap
  //       );
  //     });
  //   }
  // };

  useEffect(() => {
    const query = searchParams?.get("query");
    if (query) {
      if (searchTextRef.current) {
        searchTextRef.current.value = query;
        getSearchResults(query);
      }
    } else {
      if (searchTextRef.current) {
        searchTextRef.current.value = "";
        setSearchResultData(null);
        setSuggestions(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <div className="mt-20 flex-grow">
      <div className="w-full max-w-[55rem] mx-auto p-5">
        <div className="mt-8 border border-gray-400 rounded w-full px-4 py-3 flex justify-between items-center space-x-5">
          <input
            ref={searchTextRef}
            type="text"
            name="searchText"
            id="searchText"
            onChange={(e) => getSuggestions(e.target.value)}
            autoComplete="off"
            placeholder="Search for restaurants and food"
            className="w-full placeholder:text-gray-500 outline-none"
          />
          {searchTextRef.current && searchTextRef.current.value !== "" ? (
            <button
              type="button"
              onClick={() => {
                if (searchTextRef.current) {
                  searchTextRef.current.value = "";
                  setSuggestions(null);
                }
              }}
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          ) : (
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          )}
        </div>
        {suggestions && suggestions.length > 0 && (
          <div className="mt-8 space-y-8">
            {suggestions.map((suggestion) => {
              return (
                <div
                  key={Math.random()}
                  role="button"
                  onClick={() => {
                    router.push(`/search?query=${suggestion.text}`);
                    setSearchResultData(null);
                    setSuggestions(null);
                  }}
                  className="flex items-center space-x-5"
                >
                  <figure>
                    <Image
                      src={`${SWIGGY_SEARCH_IMG_URL}${suggestion.cloudinaryId}`}
                      alt="Kings"
                      width={70}
                      height={70}
                      className="rounded-md"
                    />
                  </figure>
                  <div>
                    <h5 className="font-light text-lg text-gray-700">
                      {suggestion.text}
                    </h5>
                    <h6 className="font-light text-sm text-gray-500">
                      {suggestion.subCategory}
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {suggestions && suggestions.length === 0 && (
          <p className="mt-8 font-semibold text-xl text-gray-700">
            No restaurant found with the given name in your location
          </p>
        )}
        {!suggestions && searchResultData && (
          <SearchResults
            tabs={searchResultDataTabs}
            list={searchResultDataList}
            // changeToRestaurantsFromDish={changeToRestaurantsFromDish}
            // query={searchParams?.get("query")}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
