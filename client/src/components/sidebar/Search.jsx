import React, { useState } from "react";
import { IoArrowBackOutline, IoSearchOutline, IoFilterSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

const Search = ({ searchLength, setSearchResults, setShowSearchResults, showSearchResults }) => {
  // Redux
  const { user } = useSelector((state) => state.user);

  // Handlers: Search for users
  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="h-[50px] my-4 px-3">
      {/* Container */}
      <div>
        {/* Search Input*/}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex  dark:bg-dark_bg_1 rounded-lg pl-2">
            {showSearchResults || searchLength > 0 ? (
              <span
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
                onClick={() => setSearchResults([])}>
                <IoArrowBackOutline className="text-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center ">
                <IoSearchOutline className="text-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => searchLength == 0 && setShow(false)}
              onKeyDown={(e) => handleSearch(e)}
            />
          </div>
          <button className="btn">
            <IoFilterSharp className="text-dark_svg_2 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
