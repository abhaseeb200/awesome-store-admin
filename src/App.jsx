import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    console.log("------");
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar showSidebar={showSidebar} handleSidebar={handleSidebar}/>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-x-hidden overflow-y-auto container custom-width-90 mx-auto">
            <Header handleSidebar={handleSidebar}/>
            <main>
              <p>main content area...</p>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
