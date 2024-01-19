import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

function DashBoardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex">
      <div>
        <Sidebar sidebarOpen={sidebarOpen} />
      </div>

      <main className="w-full">
        <div className="flex items-center justify-between">
          <div
            className="ml-2 pt-5 cursor-pointer"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            {sidebarOpen ? <FaCircleChevronLeft className="text-purple-500 text-lg" /> : <FaCircleChevronRight className="text-purple-500 text-lg" />}
          </div>

          <div className="ml-2 pt-5 cursor-pointer">
            <div className="flex items-center gap-x-1 mr-2 border px-4 rounded-lg bg-purple-300">
              <FaUserCircle />

              <div className="font-semibold text-sm text-slate-900 p-1">N'Dri Diby</div>
            </div>
          </div>
        </div>

        <div>{children}</div>
      </main>
    </div>
  );
}

export default DashBoardLayout;
