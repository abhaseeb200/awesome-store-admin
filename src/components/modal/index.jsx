import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpenModal, setIsOpenModal, customWidth, children }) => {
  function closeModal() {
    setIsOpenModal(false);
  }
  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog as="div" className={`relative z-10 `} onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 opacity-75" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className={`transform overflow-hidden rounded-md bg-white dark:bg-dark-200 p-6 text-left align-middle shadow-xl transition-all ${customWidth}`}
                >
                  <span
                    className="absolute top-6 right-6 bg-primaryLight text-primaryDark primaryLight p-1.5 rounded-md cursor-pointer z-30"
                    onClick={closeModal}
                  >
                    <IoClose size="1.15rem" />
                  </span>
                  <div>{children}</div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
