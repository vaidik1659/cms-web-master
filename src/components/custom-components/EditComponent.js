import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import FormatSizeIcon from "@mui/icons-material/FormatSize";

/**
 * The toolbox for each component includes change size, text, position and delete
 * @param {*} props
 * @returns
 */

function EditComponent(props) {
  const handleDeleteClick = () => {
    return (
      props.onDeleteClick(props.id),
      props.onDeleteConfigClick(props.type, props.id)
    );
  };

  return (
    <div className="editComponent box-container">
      <div className="edit-container">
        {props.isImg ? (
          <input type="file" name="myImage" onChange={props.onImgChange} />
        ) : (
          <input
            className="edit-input"
            type="text"
            onChange={props.handleTextChange}
            value={props.currentText}
          />
        )}
        <CreateIcon
          className="edit-icon"
          onClick={props.handleTextChangeClick}
        />
      </div>
      <hr />
      <div className="edit-container edit-size-container">
        <FormatSizeIcon className="edit-icon edit-icon-static" />|
        <i
          onClick={props.onSizeChangeToSmallClick}
          className="fa-solid fa-s edit-icon"
        ></i>
        <i
          onClick={props.onSizeChangeToMediumClick}
          className="fa-solid fa-m edit-icon"
        ></i>
        <i
          onClick={props.onSizeChangeToLargeClick}
          className="fa-solid fa-l edit-icon"
        ></i>
      </div>
      <hr />
      <div
        onClick={handleDeleteClick}
        className="edit-container edit-delete-container"
      >
        <i className="fa-solid fa-trash-can edit-icon"></i>Delete component
      </div>
    </div>
  );
}

export default EditComponent;
