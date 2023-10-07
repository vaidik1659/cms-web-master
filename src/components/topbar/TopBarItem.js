import React, { useState } from "react";

/**
 * A container for top bar icon to handle click to show function
 * @param {*} props
 * @returns
 */

function TopBarItem(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <React.Fragment>
      <div
        className="topbar-icon-container"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {props.icon}
      </div>
      {isOpen && props.children}
    </React.Fragment>
  );
}

export default TopBarItem;
