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
            className="w-42 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-black"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            required
          />

          <label className="block cursor-pointer">
            <input
              type="file"
              className="cursor-pointer block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileInput;
