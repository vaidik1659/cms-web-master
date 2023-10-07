import React, { useEffect, useState } from "react";
import { getObj } from "../../Services/firebase";
import HomeSection from "./HomeSection";

/**
 * The homepage for cms shows all the pages user created
 * @param {*} props
 * @returns
 */

function HomeMainPage(props) {
  const [homeSections, setHomeSections] = useState([]);
  const [sectionConfig, setSectionConfig] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getObj();
      createSection(data);
    };
    fetchData();
  }, []);

  const createSection = (obj) => {
    for (const pageID in obj) {
      if (pageID === "undefined") continue;
      setHomeSections((prev) => [
        ...prev,
        <HomeSection id={pageID} obj={obj[pageID]} key={pageID} />,
      ]);
    }
  };

  return <div>{homeSections.map((s) => s)}</div>;
}

export default HomeMainPage;
