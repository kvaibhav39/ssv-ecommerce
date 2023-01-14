import React from "react";
import { Link } from "react-router-dom";
import "../../css/component.css";
import { useLocation } from "react-router-dom";
import Logo from "../../images/sangini-logo.png";
import { routes, sidebarLink } from "../../constants";
import { sidebarSmallIcon } from "../../icons";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div className="sidebar_container">
      <ul className="sidebar_nav">
        {sidebarLink.map((i) => {
          return (
            <li className="sidebar_item" key={i.id}>
              <Link
                className={`sidebar_link ${
                  pathname?.match(
                    new RegExp("^.*" + i.linkClassName + ".*$")
                  ) && "active"
                } `}
                to={i.linkTo}
              >
                {i.icon}
                <span>{i.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
