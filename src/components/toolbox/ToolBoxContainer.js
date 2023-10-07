import React, { useState, useRef, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

/**
 * The container of component tool box (just for styling)
 * @param {*} props
 * @returns
 */

function ToolBoxContainer(props) {
  const [openToolBox, setOpenToolBox] = useState(false);
  const onClickToolBox = () => {
    setOpenToolBox(!openToolBox);
  };
  const containerRef = useRef(null);

  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (
        containerRef.current &&
        openToolBox &&
        !containerRef.current.contains(e.target)
      ) {
        setOpenToolBox(false);
      }
    };
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [openToolBox]);

  return (
    <div ref={containerRef}>
      <button
        className="toolBox-outer-container box-container toolbox-button"
        onClick={onClickToolBox}
      >
        <AddIcon className="section-box-icon" />
        Add Block
      </button>
      {openToolBox && props.children}
    </div>
  );
}

export default ToolBoxContainer;
