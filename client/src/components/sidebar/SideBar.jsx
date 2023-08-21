import React, { useState } from "react";
import SideBarHeader from "./SideBarHeader";
import Notifications from "./Notifications";
import Search from "./Search";
import Conversation from "./Conversation";
import SearchResults from "./SearchResults";

const SideBar = ({ onlineUsers }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  console.log(searchResults);
  return (
    <div className="flex flex-col w-[400px]">
      {/* SideBar Header */}
      <SideBarHeader />
      <div className="w-full sidebarContainer select-none dark:bg-dark_bg_2 rounded-md ">
        {/* Search */}
        <Search
          searchLength={searchResults.length}
          setSearchResults={setSearchResults}
          setShowSearchResults={setShowSearchResults}
          showSearchResults={showSearchResults}
        />

        {searchResults.length > 0 ? (
          <>
            {/* Search Results */}
            <SearchResults
              searchResults={searchResults}
              setShowSearchResults={setShowSearchResults}
              setSearchResults={setSearchResults}
            />
          </>
        ) : (
          <>
            {/* Conversations */}
            <Conversation onlineUsers={onlineUsers} />
          </>
        )}
      </div>
    </div>
  );
};

export default SideBar;
