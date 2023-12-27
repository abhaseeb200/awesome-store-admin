import { ToastContainer } from "react-toastify";
import Main from "./config/router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Main />
    </>
  );
}

export default App;
