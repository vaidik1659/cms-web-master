import React, { useState } from "react";
import TopBar from "./components/topbar/TopBar";
import SideBar from "./components/sidebar/SideBar";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage";
import { initializeApp, firebaseConfig } from "./Services/firebase";
import HomeMainPage from "./components/mainpage/HomeMainPage";
import CreatePage from "./components/mainpage/CreatePage";
/**
 * This section handles the router. Dynamic render the top bar and main page based on input url
 * @returns
 */
function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [pageList, setPageList] = useState([]);
  // initializeApp(firebaseConfig);
  return (
    <React.Fragment>
      <TopBar isLogin={isLogin} setIsLogin={setIsLogin}></TopBar>
      <BrowserRouter>
        <div className="page-container">
          <SideBar activeItem="Home" />
          <div className="others">
            <Routes>
              <Route path="/" element={<></>} />
              <Route
                path="/home"
                element={
                  <>
                    <HomeMainPage
                      pageList={pageList}
                      setPageList={setPageList}
                    />
                  </>
                }
              />
              <Route
                path="/create"
                element={
                  <>
                    <CreatePage />
                  </>
                }
              />
              <Route
                path="/newpage"
                element={
                  <>
                    <MainPage />
                  </>
                }
              />
              <Route
                path="/create/:pageId"
                element={
                  <>
                    <MainPage />
                  </>
                }
              />
              <Route path="home" element={<></>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
