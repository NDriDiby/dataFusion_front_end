import React from "react";

function Spinner({ message }) {
  return (
    <div className="flex flex-col  justify-center items-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
      <div className="font-bold text-center p-2">{message}</div>
    </div>
  );
}

export default Spinner;
