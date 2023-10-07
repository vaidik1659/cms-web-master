import React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./Section.css";

/**
 * A default section just for user to add new section
 * @param {*} props
 * @returns
 */

function DefaultSection(props) {
  return (
    <div className="defaultSection-container">
      {/* <button onClick={props.onLoginClick}>Login</button>
            <button onClick={props.onSaveClick}>Save</button> */}
      <div>
        <AddIcon className="section-icon" onClick={props.onAddClick} />
      </div>
    </div>
  );
}

export default DefaultSection;
