import React from "react";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_1 dark:text-dark_text_1 shadow-md w-52 rounded-md">
      <ul>
        {/* <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>New Community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Starred Messages</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3">
          <span>Settings</span>
        </li> */}
        <li
          className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3"
          onClick={() => dispatch(logout())}>
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
