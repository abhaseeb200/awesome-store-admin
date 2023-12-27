import { NavLink } from "react-router-dom";
const NavbarLink = ({ to, title, icon }) => {
  return (
    <NavLink
      to={to}
      className="block py-2 px-3 mt-1 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-700 flex items-center gap-2"
    >
      <span>{icon}</span>
      <span>{title}</span>
    </NavLink>
  );
};

export default NavbarLink;
