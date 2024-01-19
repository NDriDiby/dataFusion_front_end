import React, { useState } from "react";

const FileInput = () => {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file.name);
    }
    console.log("file:", file.name);
  };

  return (
    <div>
      <div className="flex-row gap-x-5 items-center justify-center text-center p-6">
        <div className="flex gap-x-5 items-center justify-center">
          <input
            type="text"
            placeholder="File Name"
            className="w-42 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <label className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
            Select File
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <div className="pt-3 ml-[75px] text-lg w-50">File: {file}</div>
      </div>
    </div>
  );
};

export default FileInput;
