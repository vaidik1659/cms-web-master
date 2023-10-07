import React from "react";
import "../custom-components/CustomComponents.css";

/**
 * return a custom text component
 * @param {*} props
 * @returns
 */
function CustomText(props) {
  return (
    <div
      onClick={props.onEditClick}
      className={`${props.size}-text customText customBox`}
    >
      {props.text}
    </div>
  );
}

export default CustomText;
