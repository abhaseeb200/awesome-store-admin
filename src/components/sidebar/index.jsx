import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router";
import { Fragment } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { CiBoxList } from "react-icons/ci";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { IoBagAddOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import NavbarLink from "../navbarLink";

const Sidebar = ({ showSidebar, handleSidebar, screenWidth }) => {
  return (
    <>
      {screenWidth < 768 ? (
        <OffCanvas showSidebar={showSidebar} handleSidebar={handleSidebar}>
          <aside className="w-64 bg-white text-black drop-shadow h-full absolute top-0 left-0 z-30">
            <SidebarContent handleSidebar={handleSidebar} />
          </aside>
        </OffCanvas>
      ) : (
        <aside className="w-64 bg-white text-black drop-shadow h-full">
          <SidebarContent handleSidebar={handleSidebar} />
        </aside>
      )}
    </>
  );
};

export default Sidebar;

const OffCanvas = ({ showSidebar, handleSidebar, children }) => {
  return (
    <Transition.Root show={showSidebar}>
      <Transition.Child
        enter="transition-opacity ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="relative z-10 w-full h-full block cursor-pointer"
      >
        <div
          className="fixed inset-0 bg-gray-500 opacity-75"
          onClick={() => handleSidebar()}
        />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition-transform duration-300 ease-in-out"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300 ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        {children}
      </Transition.Child>
    </Transition.Root>
  );
};

const SidebarContent = ({ screenWidth, handleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="flex items-center h-16 border-b border-gray-200 px-4">
        <span className="font-bold text-2xl text-gray-700">Awesome</span>
      </div>
      <nav className="mt-4 px-4" onClick={() => handleSidebar()}>
        <NavbarLink
          to="/"
          title="Dashboard"
          icon={<IoHomeOutline size="1.1rem" />}
        />
        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          Order
        </div>
        <NavbarLink
          to="/orderlist"
          title="Order List"
          icon={<GoChecklist size="1.1rem" />}
        />
        <NavbarLink
          to="/orderdetails"
          title="Order Details"
          icon={<LiaFileInvoiceSolid size="1.1rem" />}
        />
        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          product
        </div>
        <NavbarLink
          to="/productlist"
          title="Product List"
          icon={<CiBoxList size="1.1rem" />}
        />
        <NavbarLink
          to="/addproduct"
          title="Add Product"
          icon={<IoBagAddOutline size="1.1rem" />}
        />
        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          auth
        </div>
        <div
          className="cursor-pointer block py-2 px-3 mt-1 rounded-md text-gray-600 hover:bg-gray-200 hover:text-gray-700 flex items-center gap-2"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </div>
      </nav>
    </>
  );
};
