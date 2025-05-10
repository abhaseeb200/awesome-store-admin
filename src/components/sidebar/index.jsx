import { Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GoChecklist } from "react-icons/go";
import { CiBoxList } from "react-icons/ci";
import { TbCategoryPlus } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { QueryClient } from "@tanstack/react-query";
import NavbarLink from "@/components/navbarLink";

const Sidebar = ({ showSidebar, handleSidebar, screenWidth }) => {
  return (
    <>
      {screenWidth < 1024 ? (
        <OffCanvas showSidebar={showSidebar} handleSidebar={handleSidebar}>
          <aside className="w-64 bg-white dark:bg-dark-200  drop-shadow h-full absolute top-0 left-0 z-30">
            <SidebarContent handleSidebar={handleSidebar} />
          </aside>
        </OffCanvas>
      ) : (
        <aside className="w-64 bg-white dark:bg-dark-200 drop-shadow h-full">
          <SidebarContent />
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

const SidebarContent = ({ handleSidebar }) => {
  const navigate = useNavigate();
  const queryClient = new QueryClient();

  const handleLogout = async () => {
    queryClient.setQueryData('auth', null);
    localStorage.removeItem('auth');
    navigate("/login", { replace: true });
    toast.success("Logout successfully!");
  };

  return (
    <>
      <div className="flex items-center h-16 border-b border-gray-600 px-4">
        <Link to="/" onClick={handleSidebar}>
          <span className="font-bold text-2xl text-gray-700 dark:text-gray-200">
            Awesome
          </span>
        </Link>
      </div>

      <nav className="mt-4 px-4">
        <NavbarLink
          to="/"
          title="Dashboard"
          icon={<IoHomeOutline size="1.1rem" />}
          handleSidebar={handleSidebar}
        />

        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          Order
        </div>
        <NavbarLink
          to="/orders"
          title="Orders"
          icon={<GoChecklist size="1.1rem" />}
          handleSidebar={handleSidebar}
        />

        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          product
        </div>
        <NavbarLink
          to="/products"
          title="Products"
          icon={<CiBoxList size="1.1rem" />}
          handleSidebar={handleSidebar}
        />

        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          category
        </div>
        <NavbarLink
          to="/categories"
          title="Categories"
          icon={<TbCategoryPlus size="1.1rem" />}
          handleSidebar={handleSidebar}
        />
        
        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          brand
        </div>
        <NavbarLink
          to="/brands"
          title="Brands"
          icon={<TbCategoryPlus size="1.1rem" />}
          handleSidebar={handleSidebar}
        />

        <div className="text-gray-400 uppercase text-sm mt-5 mb-2 px-4">
          auth
        </div>
        <div
          className="cursor-pointer block py-2 px-3 mt-1 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-dark-600 hover:text-gray-700 dark:hover:text-gray-200 flex items-center gap-2"
          onClick={handleLogout}
        >
          <FiLogOut />
          <span>Logout</span>
        </div>
      </nav>
    </>
  );
};
