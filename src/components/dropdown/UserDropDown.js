import React, { useEffect, useState } from "react";
import "./DropDown.css";
import Auth from "../authentication/Auth";
import { getName, logout } from "../../Services/firebase";

/**
 * Render the user dropdown menu
 * @param {*} props
 * @returns
 */

function UserDropDown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('')
  const onOpenClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const getUserName = async () => {
      const name = await getName()
      setUserName(name)
    }
    getUserName()
    // setUserName(getUserName())
    // console.log(getUserName())
  }, [])

  const onLogOutClick = async () => {
    await logout();
    props.setIsLogin(false);
  };
  return props.isLogin ? (
    <div className="user-dropdown">
      <div className="username">{userName}</div>
      <ul className="dropdown-list">
        <li className="dropdown-item">Profile</li>
        <li className="dropdown-item">Help</li>
        <li className="dropdown-item" onClick={onLogOutClick}>
          Log out
        </li>
      </ul>
    </div>
  ) : (
    <div className="user-dropdown">
      <div className="username">Welcome</div>
      <ul className="dropdown-list">
        <li className="dropdown-item" onClick={onOpenClick}>
          Login in
        </li>
        <li className="dropdown-item">Help</li>
      </ul>
      {isOpen && (
        <Auth setIsOpen={setIsOpen} setIsLogin={props.setIsLogin}></Auth>
      )}
    </div>
  );
}

export default UserDropDown;
