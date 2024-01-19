import React from "react";
import FileInput from "./FileInput";

function CreateSaleModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90 flex justify-center items-center">
      <div className={`relative bg-white p-4 rounded md:h-auto min-w-[500px]`}>
        {/* Add relative positioning here */}
        <button className="absolute top-3 right-2 px-3 py-1 bg-red-700 text-white rounded" onClick={closeModal}>
          X
        </button>
        <h2 className="text-xl mb-4 text-center font-bold text-[#0a2558]">Create New Sales Record</h2>
        <div className="p-2 flex-col space-y-3">
          <h4 className="semi-bold text-md text-blue-900">Date</h4>
          <h4 className="semi-bold text-md text-blue-900">Product Category</h4>
          <h4 className="semi-bold text-md text-blue-900">Product Name</h4>
          <h4 className="semi-bold text-md text-blue-900">Sales</h4>
          <h4 className="semi-bold text-md text-blue-900">Unites</h4>
        </div>

        <FileInput />

        <div className="px-5 flex justify-center">
          <button className="px-3 py-1 bg-green-500 text-white rounded" onClick={closeModal}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSaleModal;
