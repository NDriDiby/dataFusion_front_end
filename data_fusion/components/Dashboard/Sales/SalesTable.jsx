import { backEnd } from "@/features/AuthSlice";
import { salesData } from "@/helper/backEndFunction";
import React, { useState, useEffect, useRef } from "react";
import CreateSaleModal from "./CreateSaleModal";
import Spinner from "../../Spinner";

function SalesTable() {
  // Example data - replace with your actual data source
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCells, setEditedCells] = useState({}); // New state to track edited cells
  const originalDataRef = useRef([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = ["date", "product_category", "product_name", "actual_sales", "actual_units", "doc_name"]; // Columns

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await backEnd.get("/sales/");
        setData(response.data);
        originalDataRef.current = JSON.parse(JSON.stringify(response.data)); // Deep copy
      } catch (error) {
        console.log("Error in getting sales data", error);
        // Optionally set an error state here
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchData();
  }, []);

  // Modify this function to update editedCells state
  const handleCellChange = (e, rowIndex, column) => {
    const newData = [...data];
    newData[rowIndex][column] = e.target.value;
    setData(newData);

    // Mark cell as edited
    const newEditedCells = { ...editedCells };
    newEditedCells[`${rowIndex}-${column}`] = true;
    setEditedCells(newEditedCells);
  };

  const resetCellEditState = (rowIndex, column) => {
    // Retrieve the original value for the specific cell
    const originalValue = originalDataRef.current[rowIndex][column];
    // Create a new copy of the current data
    const newData = [...data];

    // Update the specific cell with its original value
    newData[rowIndex][column] = originalValue;

    // Set the updated data array as the new state
    setData(newData);

    // Remove the cell from the editedCells state
    const newEditedCells = { ...editedCells };
    delete newEditedCells[`${rowIndex}-${column}`];
    setEditedCells(newEditedCells);
  };

  const validateCellEditState = (rowIndex, column) => {
    // Assuming the current data already has the updated value,
    // Update the original data reference to consider the new value as the original
    originalDataRef.current[rowIndex][column] = data[rowIndex][column];

    // Update the editedCells state to no longer mark this cell as edited
    const newEditedCells = { ...editedCells };
    delete newEditedCells[`${rowIndex}-${column}`];
    setEditedCells(newEditedCells);

    // There is no need to call setData here if data already contains the updated value
  };

  return (
    <>
      <div className="mx-2 mt-10 shadow-lg">
        <div className="text-center text-2xl font-semibold p-4 bg-blue-500 text-white">Sales Table</div>
        <button onClick={openModal} className="p-2 bg-green-100 border border-gray-200 rounded-xl w-fit mt-2 mb-2 ml-2 hover:bg-blue-100">
          + add new sale
        </button>
        <div className="">
          <table className="min-w-full leading-normal">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-blue-100">
                {columns.map((column) => (
                  <th key={column} className="px-5 py-3 border-b-2 border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold text-center ">
                    {column.replace("_", " ").toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full leading-normal">
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-5">
                      <Spinner aria-label="Loading..." /> <p>Loading data, please wait...</p>
                    </td>
                  </tr>
                ) : (
                  data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-100">
                      {columns.map((column) => (
                        <td key={column} className={`px-3 py-5 border-b border-gray-200 bg-white text-sm`}>
                          {column !== "doc_name" ? (
                            <>
                              <div className="flex items-center space-x-3">
                                <input type="text" value={row[column]} onChange={(e) => handleCellChange(e, rowIndex, column)} className="w-full bg-transparent p-2 text-center border border-white" />
                                {editedCells[`${rowIndex}-${column}`] && (
                                  <div className="flex space-x-2">
                                    <button className="bg-red-500 px-1 border rounded-xl" onClick={() => resetCellEditState(rowIndex, column)}>
                                      X
                                    </button>
                                    <button onClick={() => validateCellEditState(rowIndex, column)} className="bg-green-500 px-1 border rounded-xl">
                                      V
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            row[column]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <CreateSaleModal setModalOpen={setIsModalOpen} />}
    </>
  );
}

export default SalesTable;
