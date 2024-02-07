import { backEnd } from "@/features/AuthSlice";
import { salesData } from "@/helper/backEndFunction";
import React, { useState, useEffect, useRef } from "react";
import CreateSaleModal from "./CreateSaleModal";
import Spinner from "../../Spinner";
import { useRouter } from "next/router";
import { FaEllipsisVertical, FaFilter, FaPlus, FaSquareXmark } from "react-icons/fa6";
import { Button, Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import ConfirmationModal from "@/components/ConfirmationModal";
import { memcachedClient } from "@/helper/QuickFunction";
import useSWR from "swr";

// / Define a fetcher function that explicitly takes a URL and options
const fetcher = (url, options) =>
  fetch(url, options).then((res) => {
    // Check if the response is ok (status in the range 200-299)
    if (!res.ok) {
      // Throw an error with the status text, which can be caught and handled by SWR
      throw new Error(res.statusText);
    }
    return res.json();
  });

function SalesTable({ initialSalesData }) {
  // Example data - replace with your actual data source
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmationOpen, setIsModalConfirmationOpen] = useState(false);
  const [editedCells, setEditedCells] = useState({}); // New state to track edited cells
  const originalDataRef = useRef(initialSalesData);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = ["date", "product_category", "product_name", "actual_sales", "actual_units", "doc_name"]; // Columns

  // Use the fetcher with useSWR, corrected endpoint, and proper destructuring
  const { data: response, error } = useSWR("http://fullyai.localhost:8000/api/v1/sales/", fetcher);

  // Update local state, ref, and manage loading state when the response changes
  useEffect(() => {
    setIsLoading(true); // Indicate loading started

    if (response) {
      setData(response); // Update state with the new response
      originalDataRef.current = JSON.parse(JSON.stringify(response)); // Update ref with a deep clone of the response
      setIsLoading(false); // Indicate loading finished once data is set
    }

    // If there's an error, you may want to handle it here and also stop loading
    if (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Indicate loading finished if an error occurs
    }
  }, [response, error]); // Depend on 'response' and 'error' to re-run the effect

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await backEnd.get("/sales/");
  //       setData(response.data);
  //       originalDataRef.current = JSON.parse(JSON.stringify(data));
  //     } catch (error) {
  //       console.error("Error in getting sales data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
        <div className="text-center text-2xl font-semibold p-2 bg-slate-800 text-white border rounded-lg">
          Sales Table
          <h6 className="text-xs text-gray-400">Last update: Friday, January 19th, 2024</h6>
        </div>
        <div className="flex gap-x-5 mt-2 ml-2">
          <Button onClick={openModal} className="p-3 bg-purple-500 mb-2 hover:bg-blue-100 hover:text-slate-900 ">
            <span className="mr-2">+</span>New Sales
          </Button>

          <Button onClick={openModal} className="p-3 bg-purple-500 mb-2 hover:bg-blue-100 hover:text-slate-900 ">
            <span className="mr-2">+</span>New product
          </Button>
        </div>

        <div className="">
          <table className="min-w-full leading-normal">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-blue-100">
                {columns.map((column) => (
                  <th key={column} className="px-5 py-3 border-b-2 border-gray-200 text-gray-800 text-left text-sm uppercase font-semibold text-center ">
                    <div className="flex justify-center items-center gap-x-2">
                      <div className="text-slate-900 font-bold"> {column.replace("_", " ").toUpperCase()}</div>
                      <span className="cursor-pointer">
                        <FaFilter className="text-gray-500 text-xs" />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-5">
                    <Spinner aria-label="Loading..." /> <p>Loading data, please wait...</p>
                  </td>
                </tr>
              ) : (
                data?.map((row, rowIndex) => (
                  <tr key={rowIndex} className="max-h-[500px] overflow-y-auto">
                    {columns.map((column) => (
                      <td key={column} className={`px-3 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer`}>
                        {column !== "doc_name" ? (
                          <div className="flex space-x-3">
                            <input type="text" value={row[column]} onChange={(e) => handleCellChange(e, rowIndex, column)} className="w-full bg-transparent p-2 border border-white text-center" />
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
                        ) : (
                          <div className="flex gap-x-5 justify-center items-center">
                            <div>{row[column]}</div>

                            <Popover placement="top">
                              <PopoverHandler>
                                <Button variant="text">
                                  <FaEllipsisVertical className="text-slate-900 cursor-pointer" />
                                </Button>
                              </PopoverHandler>
                              <PopoverContent>
                                <div
                                  className="cursor-pointer flex items-center gap-x-1"
                                  onClick={() => {
                                    setIsModalConfirmationOpen(true);
                                    console.log(data[rowIndex]["id"]);
                                  }}
                                >
                                  <FaSquareXmark className="text-red-500" />
                                  <span className="text-xs text-slate-900 font-semibold">Delete Row</span>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
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
      {isModalOpen && <CreateSaleModal setModalOpen={setIsModalOpen} />}
      {isModalConfirmationOpen && <ConfirmationModal setIsModalConfirmationOpen={setIsModalConfirmationOpen} />}
    </>
  );
}

export default SalesTable;
