import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Dropdown = ({
  title,
  items,
  titleClass,
  menuItemsClass,
  icon,
  handleOnClick,
  currentDocID
}) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button className={titleClass}>
          {icon} {title}
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          as={Fragment}
          className="z-30"
        >
          <Menu.Items
            className={`text-sm flex flex-col bg-white dark:bg-dark-100 drop-shadow-lg rounded-md px-1.5 py-2  ${menuItemsClass}`}
          >
            {items?.map((item, index) => (
              <Menu.Item key={index}>
                <div
                  className="flex items-center dark:text-gray-300 dark:hover:bg-dark-600 dark:hover:text-gray-300 hover:bg-primaryLight hover:text-primaryDark rounded-md cursor-pointer py-1 px-2 my-0.5 text-gray-600"
                  onClick={() => handleOnClick(item?.action, currentDocID)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  <span className="">{item.label}</span>
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default Dropdown;
