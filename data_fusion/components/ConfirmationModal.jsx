import React from "react";
import { Button } from "@material-tailwind/react";

function ConfirmationModal({ setIsModalConfirmationOpen }) {
  const closeModal = () => {
    setIsModalConfirmationOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90 flex justify-center items-center">
      <div className={`relative bg-white p-4 rounded md:h-auto min-w-[500px]`}>
        {/* Add relative positioning here */}
        <button className="absolute top-3 right-2 px-3 py-1 bg-red-700 text-white rounded" onClick={closeModal}>
          X
        </button>
        <h2 className="text-xl mb-4 text-center font-bold text-[#0a2558]">Delete Sales Record</h2>
        <div className="p-2 flex-col space-y-3 text-lg">Are you sure you want to delete this record ?</div>

        <div className="px-5 flex justify-center mt-5">
          <Button className="px-3 py-1 bg-purple-500 text-white rounded" onClick={closeModal}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
