import React, { useEffect, useState } from "react";
import "./Section.css";
import ToolContainer from "../toolbox/ToolContainer";
import ToolBox from "../toolbox/ToolBox";
import SectionBoxContainer from "../toolbox/SectionBoxContainer";
import ToolBoxContainer from "../toolbox/ToolBoxContainer";
import CustomComponentContainer from "../custom-components/CustomComponentContainer";
import CustomButton from "../custom-box/CustomButton";
import CustomText from "../custom-box/CustomText";
import CustomImg from "../custom-box/CustomImg";
import {
  removeSection,
  updateSection,
  uploadImage,
} from "../../Services/firebase";

/**
 * This part renders each section in one page and it take an object from main page to create all the components data
 * @param {*} props
 * @returns
 */

function Section(props) {
  const [onHover, setOnHover] = useState(false);
  const [sectionContent, setSectionContent] = useState([]);

  //fetch data from backend
  const [sectionConfig, setSectionConfig] = useState(props.obj);

  const onDeleteClick = (id) => {
    setSectionContent((prev) => {
      return prev.filter((item, index) => {
        return item.props.id !== id;
      });
    });
  };

  const onDeleteConfigClick = (type, id) => {
    switch (type) {
      case "text": {
        setSectionConfig((prev) => {
          return {
            ...prev,
            [type]: {
              ...prev.text,
              [id]: "",
            },
          };
        });
      }
    }
    switch (type) {
      case "image": {
        setSectionConfig((prev) => {
          return {
            ...prev,
            [type]: {
              ...prev.image,
              [id]: "",
            },
          };
        });
      }
    }
    switch (type) {
      case "button": {
        setSectionConfig((prev) => {
          return {
            ...prev,
            [type]: {
              ...prev.button,
              [id]: "",
            },
          };
        });
      }
    }
  };
  //create component data from the config object
  const createComponents = () => {
    for (const componentType in sectionConfig) {
      if (componentType === "uid") continue;
      if (componentType === "pageID") continue;
      const componentItems = sectionConfig[componentType];
      for (const componentID in componentItems) {
        if (componentItems[componentID] === "") continue;
        let component;
        switch (componentType) {
          case "text": {
            component = <CustomText />;
            break;
          }
          case "image": {
            component = <CustomImg />;
            break;
          }
          case "button": {
            component = <CustomButton />;
            break;
          }
        }
        setSectionContent((prev) => [
          ...prev,
          <CustomComponentContainer
            id={componentID}
            key={componentID}
            type={componentType}
            text={componentItems[componentID].text}
            size={componentItems[componentID].size}
            position={componentItems[componentID].position}
            onDeleteClick={onDeleteClick}
            setSectionConfig={setSectionConfig}
            onDeleteConfigClick={onDeleteConfigClick}
            component={component}
          />,
        ]);
      }
    }
  };

  useEffect(() => {
    createComponents();
  }, []);

  const onSectionHover = () => {
    setOnHover(true);
  };
  const onSectionOut = () => {
    setOnHover(false);
  };

  // post data to database
  const onSaveClick = async() => {
    console.log(sectionConfig);
    if(sectionConfig.image){
      let key = Object.keys(sectionConfig.image)
      console.log(key)
      for(let i=0;i<key.length;i++){
        console.log(i);
        console.log(sectionConfig.image[key[i]])
        let address = await uploadImage('1',sectionConfig.image[key[i]]['img'],'png')
        sectionConfig.image[key[i]]['img'] = address;
      }
    }
    console.log(sectionConfig);
    updateSection(sectionConfig, props.id);

  };

  return (
    <div
      className="section"
      onMouseOver={onSectionHover}
      onMouseOut={onSectionOut}
    >
      <ToolContainer show={onHover}>
        <ToolBoxContainer>
          <ToolBox
            setSectionContent={setSectionContent}
            setSectionConfig={setSectionConfig}
            onDeleteConfigClick={onDeleteConfigClick}
          />
        </ToolBoxContainer>
        <SectionBoxContainer
          onSaveClick={onSaveClick}
          onDeleteClick={() => {
            console.log(props.id);
            props.onDeleteClick(props.id);
            removeSection(props.id);
          }}
        >
        </SectionBoxContainer>
      </ToolContainer>
      {sectionContent.map((content) => {
        return content;
      })}
    </div>
  );
}

export default Section;
