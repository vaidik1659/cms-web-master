import React, { useState, useEffect } from "react";
import Section from "../custom-components/Section";
import DefaultSection from "../custom-components/DefaultSection";
import { v4 as uuidv4 } from "uuid";
import { addSection, getUid } from "../../Services/firebase";
import { useLocation, useParams } from "react-router-dom";

/**
 * This section is for the page to create new page or edit existing pages.
 * Using react state sections to preserve any new sections user added.
 * The initial state is an empty array when a user created new page or the data fetched from backend if user is editing a existing page.
 */

function MainPage() {
  const [sections, setSection] = useState([]); // fetch data from backend
  let { pageId } = useParams();
  const [pageID, setPageID] = useState(
    pageId === undefined ? uuidv4() : pageId
  );
  const location = useLocation();
  let { obj, name } = location.state;
  if (obj === undefined) obj = {};
  if (name === undefined) name = "Unnamed-" + pageID.substring(0, 5);
  console.log(name)
  useEffect(() => {
    for (const sectionID in obj) {
      console.log(sectionID);
      setSection((prev) => {
        return [
          ...prev,
          <Section
            id={sectionID}
            key={sectionID}
            onDeleteClick={onDeleteClick}
            pageID={pageID}
            obj={obj[sectionID]}
          />,
        ];
      });
    }
  }, []);

  const onAddClick = async () => {
    const id = uuidv4();
    addSection({}, id, `${pageID}`);
    const uid = getUid();
    setSection((preValue) => {
      return [
        ...preValue,
        <Section
          id={id}
          key={id}
          onDeleteClick={onDeleteClick}
          pageID={pageID}
          obj={{ uid: uid, pageID: pageID }}
        />,
      ];
    });
  };

  const onDeleteClick = (id) => {
    setSection((preValue) => {
      return preValue.filter((item, index) => {
        return item.props.id !== id;
      });
    });
  };

  return (
    <div>
      {sections.map((s) => s)}
      <DefaultSection onAddClick={onAddClick} />
    </div>
  );
}

export default MainPage;
