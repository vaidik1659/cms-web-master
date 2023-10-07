import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import CloseIcon from "@mui/icons-material/Close";

/**
 *  Middle page of creating a new page, adding this page to separate creating new page from edit existing ones
 */
function CreatePage() {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <div>
      <div id="create-mask"></div>
      <div className="create-page">
        <h2>Enter your page name</h2>
        <div className="page-name-input">
          <Link to={"/"}>
            <CloseIcon className="close-icon"></CloseIcon>
          </Link>
          <input
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
          ></input>
          <Link to={`/newpage`} state={{ name: name }}>
            <button>Enter</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
