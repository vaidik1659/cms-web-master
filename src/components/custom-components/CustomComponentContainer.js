import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import EditComponent from "./EditComponent";
import "./CustomComponents.css";

/**
 * Return the custom component container. It includes a custom component and toolbox for edit
 * and an object record all the config files which can later update to the backend
 * @param {*} props
 * @returns
 */
function CustomComponentContainer(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const containerRef = useRef();
  const [componentConfig, setComponentConfig] = useState({
    text: props.text,
    position: props.position,
    size: "medium",
    img: null,
    type: props.type,
  });
  const type = componentConfig.type;
  const id = props.id;

  const d_x = componentConfig.position.split(",");
  const default_x = parseInt(d_x[0].replace(/[^\d|^\.|^\-]/g, ""));
  const default_y = parseInt(d_x[1].replace(/[^\d|^\.|^\-]/g, ""));

  // handle text
  const [currentText, setCurrentText] = useState(props.text);

  // currentText,setCurrentText,handleChange keeps track of the text input value
  const handleTextChange = (event) => {
    console.log("text changed");
    const newValue = event.target.value;
    setCurrentText(newValue);
  };

  // handleTextChangeClick update the config object when user confirm the change
  const handleTextChangeClick = () => {
    setComponentConfig((prevState) => ({
      ...prevState,
      text: currentText,
    }));
  };

  // handle size change
  const onSizeChangeToSmallClick = () => {
    setComponentConfig((prev) => ({
      ...prev,
      size: "small",
    }));
  };

  const onSizeChangeToMediumClick = () => {
    setComponentConfig((prev) => ({
      ...prev,
      size: "medium",
    }));
  };

  const onSizeChangeToLargeClick = () => {
    setComponentConfig((prev) => ({
      ...prev,
      size: "large",
    }));
  };

  // handle image change

  const onImgChange = (event) => {
    setComponentConfig((prev) => {
      if (event) {
        return {
          ...prev,
          img: event.target.files[0],
        };
      } else {
        return {
          ...prev,
          img: null,
        };
      }
    });
  };

  //control opening edit window
  const onEditClick = () => {
    setOpenEdit(!openEdit);
  };
  //close edit window when click outside
  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (
        containerRef.current &&
        openEdit &&
        !containerRef.current.contains(e.target)
      ) {
        setOpenEdit(false);
      }
    };
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [openEdit]);

  //TODO
  useEffect(() => {
    switch (type) {
      case "text": {
        props.setSectionConfig((prev) => ({
          ...prev,
          [type]: {
            ...prev.text,
            [id]: componentConfig,
          },
        }));
        break;
      }
      case "image": {
        props.setSectionConfig((prev) => {
          return {
            ...prev,
            [type]: {
              ...prev.image,
              [id]: componentConfig,
            },
          };
        });
        break;
      }

      case "button": {
        props.setSectionConfig((prev) => ({
          ...prev,
          [type]: {
            ...prev.button,
            [id]: componentConfig,
          },
        }));
        break;
      }
    }
  }, [componentConfig]);

  /**
   * keep track of the position of the component (transform is the attribute of Draggable component)
   *
   */
  const getPosition = () => {
    const x = containerRef.current.style.transform;
    let a = x.split(/[()]+/);

    setComponentConfig((prevState) => ({
      ...prevState,
      position: a[1],
    }));
  };

  return (
    <Draggable
      onStop={getPosition}
      defaultPosition={{ x: default_x, y: default_y }}
      bounds="parent"
    >
      <div ref={containerRef} className="custom-container">
        {React.cloneElement(props.component, {
          text: componentConfig.text,
          size: componentConfig.size,
          img: componentConfig.img,
          onEditClick: onEditClick,
          onImgChange: onImgChange,
        })}
        {openEdit && (
          <EditComponent
            id={props.id}
            type={props.type}
            handleTextChange={handleTextChange}
            currentText={currentText}
            handleTextChangeClick={handleTextChangeClick}
            onDeleteClick={props.onDeleteClick}
            onDeleteConfigClick={props.onDeleteConfigClick}
            onSizeChangeToSmallClick={onSizeChangeToSmallClick}
            onSizeChangeToMediumClick={onSizeChangeToMediumClick}
            onSizeChangeToLargeClick={onSizeChangeToLargeClick}
            onImgChange={onImgChange}
            isImg={props.type === "image"}
          />
        )}
      </div>
    </Draggable>
  );
}

export default CustomComponentContainer;

export {};
