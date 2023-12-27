import { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleInnerWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    addEventListener("resize", handleInnerWidth);
    return () => {
      removeEventListener("resize", handleInnerWidth);
    };
  }, []);
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          showSidebar={showSidebar}
          handleSidebar={handleSidebar}
          screenWidth={screenWidth}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-x-hidden overflow-y-auto container custom-width-90 mx-auto">
            <Header handleSidebar={handleSidebar} screenWidth={screenWidth} />
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
