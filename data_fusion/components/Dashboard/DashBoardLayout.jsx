"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FaCircleChevronLeft, FaCircleChevronRight, FaBell } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

function DashBoardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} />

      <main className="w-full overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="ml-2 pt-5 cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FaCircleChevronLeft className="text-purple-500 text-xl" /> : <FaCircleChevronRight className="text-purple-500 text-xl" />}
          </div>

          <div className="ml-2 pt-5 cursor-pointer">
            <div className="flex gap-x-2">
              <div className="relative inline-block pt-3 ">
                <FaBell className="text-slate-900 text-xl hover:text-gray-500" />
                <div className="absolute top-1 -right-3 rounded-full bg-purple-500 text-xs text-white leading-none h-5 min-w-5 flex items-center justify-center border">9</div>
              </div>

              <div className="flex items-center gap-x-1 mr-2 px-4 rounded-lg">
                <FaUserCircle className="h-6 w-6" />
                <div className="font-semibold text-sm text-slate-900 p-1">
                  <p className="text-xs font-bold text-purple-500 ">Data Fusion</p>
                  <p className="text-xs font-medium text-gray-500 hover:text-slate-900 ">Product Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>{children}</div>
      </main>
    </div>
  );
}

export default DashBoardLayout;
