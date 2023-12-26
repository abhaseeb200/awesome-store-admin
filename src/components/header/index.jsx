const Header = ({handleSidebar}) => {
  return (
    <header className="bg-white border-b border-gray-200 rounded drop-shadow-sm mt-4">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="text-gray-500 focus:outline-none" onClick={()=>handleSidebar()}>Menu</button>
        </div>
        <div className="flex items-center">
          {/* Add user profile information or other header content here */}
        </div>
      </div>
    </header>
  );
};

export default Header;
