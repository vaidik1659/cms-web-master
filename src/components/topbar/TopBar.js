import React, { useState } from "react";
import "./TopBar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TopBarItem from "./TopBarItem";
import UserDropDown from "../dropdown/UserDropDown";

/**
 * render the top bar menu
 * @param {*} props
 * @returns
 */

function TopBar(props) {
  return (
    <div className="topbar">
      <div className="topbar-wrapper">
        <div className="left-top">
          <span className="title">WEB-CMS</span>
        </div>
        <div className="right-top">
          <div className="topbar-icons">
            <TopBarItem
              icon={<HelpOutlineIcon fontSize="large" />}
            ></TopBarItem>
            <TopBarItem
              icon={<NotificationsNoneIcon fontSize="large" />}
            ></TopBarItem>
            <TopBarItem icon={<AccountCircleIcon fontSize="large" />}>
              <UserDropDown
                isLogin={props.isLogin}
                setIsLogin={props.setIsLogin}
              />
            </TopBarItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
