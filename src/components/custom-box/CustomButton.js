import React from "react";
import "../custom-components/CustomComponents.css";

/**
 * Render the custom button component
 * @param {*} props
 * @returns
 */

function CustomButton(props) {
  return (
    <div onClick={props.onEditClick}>
      <button className={`${props.size}-button customButton customBox`}>
        {props.text}
      </button>
    </div>
  );
}

export default CustomButton;
