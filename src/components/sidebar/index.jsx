import { Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { LiaFileInvoiceSolid } from "react-icons/lia";

const Sidebar = ({ showSidebar, handleSidebar }) => {
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
        // onClick={}
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
        className=""
      >
        <aside className="w-64 bg-white text-black drop-shadow h-full absolute top-0 lef-0 z-30">
          <div className="flex items-center h-16 border-b border-gray-200 px-4">
            <span className="text-lg font-bold">Awesome Panel</span>
          </div>
          <nav className="mt-4">
            <a
              href="#"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100 flex items-center gap-2"
            >
              <span>
                <IoHomeOutline size="1.1rem" />
              </span>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="block py-2 px-4 text-gray-900 hover:bg-gray-100 flex items-center gap-2"
            >
              <span>
                <LiaFileInvoiceSolid size="1.1rem" />
              </span>
              <span>Orders</span>
            </a>
          </nav>
        </aside>
      </Transition.Child>
    </Transition.Root>
  );
};

export default Sidebar;
