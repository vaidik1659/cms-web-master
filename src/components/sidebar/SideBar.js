import "./SideBar.css";
import { LineStyle, Timeline, TrendingUp } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";

import { Link } from "react-router-dom";
import { useState } from "react";

/**
 * Render the sidebar menu
 * @param {*} props
 * @returns
 */
export default function Sidebar(props) {
  const [activeItem, setActiveItem] = useState("Home");
  const onClickHome = () => {
    setActiveItem("Home");
  };

  const onClickCreate = () => {
    setActiveItem("Create");
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to={"/Home"}>
              <li
                className={
                  "sidebarListItem" + (activeItem === "Home" ? " active" : "")
                }
                onClick={onClickHome}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to={"/Create"}>
              <li
                className={
                  "sidebarListItem" + (activeItem === "Create" ? " active" : "")
                }
                onClick={onClickCreate}
              >
                <CreateIcon className="sidebarIcon" />
                Create
              </li>
            </Link>
            <Link to={""}>
              <li
                className={
                  "sidebarListItem" + (activeItem === "Sales" ? " active" : "")
                }
              >
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
