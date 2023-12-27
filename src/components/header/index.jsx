import { HiOutlineMenu } from "react-icons/hi";

const Header = ({ handleSidebar, screenWidth }) => {
  return (
    <header className="bg-white border-b border-gray-200 rounded drop-shadow-sm mt-4">
      <div className="flex items-center p-4">
        <div className="flex items-center">
          {screenWidth < 768 && (
            <span className="cursor-pointer" onClick={() => handleSidebar()}>
              <HiOutlineMenu size="1.5rem" />
            </span>
          )}
        </div>
        <div className="flex items-center ml-2">
            <p>Welcome admin!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
