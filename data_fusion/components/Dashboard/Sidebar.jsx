import Link from "next/link";
import React from "react";

// Import icons from a library like react-icons
import { FaSalesforce, FaRegMoneyBillAlt, FaUsers, FaCog } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-[200px] bg-slate-900 h-screen h-[100vh]">
      <div className="flex justify-center items-center text-xl text-white pt-2">Data Fusion</div>

      <div className="flex flex-col gap-y-4 mt-6 ml-5">
        <Link href="/dashboard/home" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaSalesforce className="inline-block mr-2" />
          Sales
        </Link>
        <Link href="/budget/home" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaRegMoneyBillAlt className="inline-block mr-2" />
          Budget
        </Link>
        <Link href="#" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaUsers className="inline-block mr-2" />
          Teams
        </Link>
        <Link href="#" className="flex sidebar-item text-white text-lg gap-x-3 items-center">
          <FaCog className="inline-block mr-2" />
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
