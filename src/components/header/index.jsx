import { HiOutlineMenu } from "react-icons/hi";
import { CiDark, CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isDarkModeAction from "../../redux/actions/themeModeAction";

const Header = ({ handleSidebar, screenWidth }) => {
  // const { isDarkMode } = useSelector((state) => state.theme);
  // const dispatch = useDispatch();

  const handleMode = () => {
    // dispatch(isDarkModeAction());
  };

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  //   console.log(isDarkMode);
  // }, [isDarkMode]);

  return (
    <header className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-200 rounded drop-shadow-sm mt-4">
      <div className="flex items-center p-4">
        <div className="flex items-center">
          {screenWidth < 1024 && (
            <span
              className="cursor-pointer dark:text-gray-200"
              onClick={() => handleSidebar()}
            >
              <HiOutlineMenu size="1.5rem" />
            </span>
          )}
        </div>
        <div className="flex items-center justify-between w-full ml-2 dark:text-gray-200">
          <p>Welcome admin!</p>
          <div onClick={handleMode} className="cursor-pointer">
            {/* {isDarkMode ? <CiDark size="1.5rem" /> : <CiLight size="1.5rem" />} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
