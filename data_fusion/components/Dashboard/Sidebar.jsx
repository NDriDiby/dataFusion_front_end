import Link from "next/link";
import React from "react";

// Import icons from a library like react-icons
import { FaSalesforce, FaRegMoneyBillAlt, FaUsers, FaCog, FaBox } from "react-icons/fa";

function Sidebar({ sidebarOpen }) {
  const sidebarClass = sidebarOpen ? "w-[200px]" : "w-[60px]";
  return (
    <div className={`bg-slate-900 h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "w-[200px]" : "w-[60px]"}`}>
      {/* <div className="flex justify-center items-center text-xl text-white pt-2">Data Fusion</div> */}

      <div className="flex flex-col gap-y-4 pt-6 ml-5">
        <Link href="/dashboard/home" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaSalesforce />
          {sidebarOpen && <span>Sales</span>}
        </Link>
        <Link href="/budget/home" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaRegMoneyBillAlt />
          {sidebarOpen && <span>Budget</span>}
        </Link>
        <Link href="/budget/home" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaBox />
          {sidebarOpen && <span>Products</span>}
        </Link>
        <Link href="#" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaUsers />
          {sidebarOpen && <span>Teams</span>}
        </Link>
        <Link href="#" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaCog />
          {sidebarOpen && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
