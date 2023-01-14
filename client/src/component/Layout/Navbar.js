import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { logout } from "../../store/slice/orderSlice";
import "../../css/component.css";
import { toast } from "react-toastify";
import { routes } from "../../constants";
import { logoutIcon, sidebarToggleIcon } from "../../icons";

const Navbar = () => {
  const dispatch = useDispatch();

  // const logoutHandler = () => {
  //   dispatch(logout());
  //   toast.success("Logout successfully !", {
  //     autoClose: 2000,
  //   });
  // };

  // let navPath;
  // let pageName = window.location.pathname.split("/").reverse();
  // console.log("pageName-- ", pageName, 'window.location.pathname ', window.location.pathname);
  // if (pageName.length !== 2) {
  //   if (pageName[0] === "create") {
  //     navPath = pageName.join(" ");
  //   } else if (pageName[1] === "page") {
  //     pageName.shift();
  //     pageName.shift();
  //   } else if (pageName[2] === "edit") {
  //     pageName.shift();
  //     pageName.shift();
  //   } else if (/(\d+)/.test(window.location.pathname)) {
  //     pageName.shift();
  //   }

  //   navPath = pageName.join(" ");
  //   console.log('navPath ', navPath)
  //   if (
  //     navPath.substring(0, navPath.length - (navPath.length - 6)) === "create"
  //   ) {
  //     navPath = navPath.slice(0, navPath.length - 1);
  //   } else if (navPath.substring(navPath.length - 2) === "k ") {
  //     navPath = navPath.slice(0, navPath.length - 1);
  //   }

  // } else {
  //   navPath = pageName.join(" ");
  // }

  return (
    <header className="top_header_section">
      <label htmlFor="sidebar_toggel" className="sidebar_toggel_btn">
        {sidebarToggleIcon}
      </label>
      {/* <h2 className="page_name_heading">{navPath}</h2> */}
      {/* <ul className="top_navbar_nav">
        <li className="top_navbar_item">
          <Link
            className="top_navbar_logout_btn"
            to={routes.login}
            onClick={logoutHandler}
          >
            {logoutIcon}
            <span>Logout</span>
          </Link>
        </li>
      </ul> */}
    </header>
  );
};

export default Navbar;
