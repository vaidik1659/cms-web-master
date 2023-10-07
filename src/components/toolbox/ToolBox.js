import React from "react";
import "./ToolBox.css";
import CustomComponentContainer from "../custom-components/CustomComponentContainer";
import CustomButton from "../custom-box/CustomButton";
import CustomText from "../custom-box/CustomText";
import CustomImg from "../custom-box/CustomImg";
import { v4 as uuidv4 } from "uuid";

/**
 * A toolbox that can add different components to current section
 * @param {*} props 
 * @returns 
 */
function Toolbox(props) {
  /**
   * delete component by id in each section
   * using the setState from the parents(Section.js)
   */
  const onDeleteClick = (id) => {
    props.setSectionContent((prev) => {
      return prev.filter((item, index) => {
        return item.props.id !== id;
      });
    });
  };

  const onClickAddButton = () => {
    const id = uuidv4();
    return props.setSectionContent((prev) => {
      return [
        ...prev,
        <CustomComponentContainer
          id={id}
          key={id}
          type="button"
          text="CustomButton"
          position="10px,10px"
          component={<CustomButton />}
          onDeleteClick={onDeleteClick}
          setSectionConfig={props.setSectionConfig}
          onDeleteConfigClick={props.onDeleteConfigClick}

        />,
      ];
    });
  };

  const onClickAddText = () => {
    const id = uuidv4();
    return props.setSectionContent((prev) => {
      return [
        ...prev,
        <CustomComponentContainer
          id={id}
          key={id}
          type="text"
          text="Write something"
          position="10px,10px"
          component={<CustomText />}
          onDeleteClick={onDeleteClick}
          setSectionConfig={props.setSectionConfig}
          onDeleteConfigClick={props.onDeleteConfigClick}

        />,
      ];
    });
  };

  const onClickAddImage = () => {
    const id = uuidv4();
    return props.setSectionContent((prev) => {
      return [
        ...prev,
        <CustomComponentContainer
          id={id}
          key={id}
          type="image"
          text="Write something"
          position="10px,10px"
          component={<CustomImg />}
          onDeleteClick={onDeleteClick}
          setSectionConfig={props.setSectionConfig}
          onDeleteConfigClick={props.onDeleteConfigClick}

        />,
      ];
    });
  };

  return (
    <div className="toolbox-container box-container">
      <div className="button-container">
        <div className="row">
          <button className="col" onClick={onClickAddText}>
            Text
          </button>
          <button className="col" onClick={onClickAddImage}>
            Image
          </button>
        </div>
        <div className="row">
          <button className="col" onClick={onClickAddButton}>
            Button
          </button>
          <button className="col" onClick={onClickAddButton}>
            Gallery
          </button>
        </div>
        <div className="row">
          <button className="col" onClick={onClickAddButton}>
            Line
          </button>
          <button className="col" onClick={onClickAddButton}>
            Accordion
          </button>
        </div>
        <div className="row">
          <button className="col" onClick={onClickAddButton}>
            Chart
          </button>
          <button className="col" onClick={onClickAddButton}>
            Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbox;
