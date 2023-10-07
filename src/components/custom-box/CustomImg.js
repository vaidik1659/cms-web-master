import React, { useState } from "react";
/**
 * Render a custom image component
 * @param {*} props
 * @returns
 */
function CustomImg(props) {
  return (
    <div onClick={props.onEditClick}>
      {props.img !== null ? (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(props.img)}
          />
          <div>Custom image</div>
          <br />
        </div>
      ) : (
        <div>No image selected</div>
      )}
    </div>
  );
}

export default CustomImg;
