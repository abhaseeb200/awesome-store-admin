import React, { useState } from "react";
import Modal from ".";
import { FiUpload } from "react-icons/fi";

const UploadModal = ({ setIsOpen, isOpen, handleOnChangeUpload, type }) => {
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "media"

  return (
    <Modal
      isOpenModal={isOpen}
      setIsOpenModal={setIsOpen}
      customWidth="w-full h-[90vh]"
    >
      <div className="w-full mx-auto overflow-hidden">
        {/* Modal Header */}
        <div className="flex border-b">
          <button
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === "upload"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload File
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === "media"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("media")}
          >
            Media Library
          </button>
        </div>

        {/* Modal Body */}
        <div className="pt-4">
          {activeTab === "upload" && <Upload />}
          {activeTab === "media" && (
            <Media handleOnChangeUpload={handleOnChangeUpload} type={type} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;

const Upload = () => {
  return (
    <>
      <label className="text-sm text-gray-500 dark:text-gray-300">
        Thumbnail
      </label>
      <label
        className={`border-gray-400 h-full w-full flex flex-col items-center rounded-md border-2 border-dashed tracking-wide cursor-pointer py-14`}
      >
        <span className="bg-gray-200 py-3 px-3 rounded-md mb-5">
          <FiUpload size="1.5rem" />
        </span>
        <span className="mt-2 text-base leading-normal bg-primaryLight text-primaryDark py-1.5 px-4 rounded-md">
          Upload image
        </span>
        <input type="file" className="hidden" />
      </label>
    </>
  );
};

const Media = ({ handleOnChangeUpload, type }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index, url) => {
    setSelectedImage(index);
    handleOnChangeUpload(url, type);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => handleImageClick(index, `https://placehold.co/300x30${index + 10}`)}
        >
          <img
            src={`https://placehold.co/300x30${index + 10}`}
            alt={`Media ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {selectedImage === index && (
            <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
