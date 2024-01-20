"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FaSalesforce, FaRegMoneyBillAlt, FaUsers, FaCog, FaBox } from "react-icons/fa";
import { FaClipboardUser, FaCircleQuestion } from "react-icons/fa6";
import { ImPowerCord } from "react-icons/im";

function Sidebar({ sidebarOpen }) {
  const router = useRouter();
  const pathName = router.pathname;
  const sidebarClass = sidebarOpen ? "w-[250px]" : "w-[60px]";
  return (
    <div className={`bg-slate-900 h-screen transition-all duration-300 ease-in-out  ${sidebarOpen ? "w-[230px]" : "w-[70px]"}`}>
      {/* <div className="flex justify-center items-center text-xl text-white pt-2">Data Fusion</div> */}

      <div className="flex flex-col gap-y-4 pt-6 p-5">
        <Link href="/dashboard/home" className={`flex text-white text-lg gap-x-3 items-center   ${pathName == "/dashboard/home" ? "rounded-full" : ""}`}>
          <div className={`rounded-full p-2 ${pathName == "/dashboard/home" ? "bg-purple-300" : ""}`}>
            <FaSalesforce />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Sales</span>}
        </Link>
        <Link href="/budget/home" className={`flex text-white text-lg gap-x-3 items-center ${pathName == "/budget/home" ? "rounded-full" : ""}`}>
          <div className={`rounded-full p-2 ${pathName == "/budget/home" ? "bg-purple-300 p-2" : ""}`}>
            <FaRegMoneyBillAlt />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Budget</span>}
        </Link>
        <Link href="/budget/home" className="flex text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <FaClipboardUser />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Clients</span>}
        </Link>
        <Link href="/budget/home" className="flex text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <FaBox />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Products</span>}
        </Link>
        <Link href="#" className="flex  text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <FaUsers />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Teams</span>}
        </Link>
        <Link href="#" className="flex text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <FaCog />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Settings</span>}
        </Link>
        <Link href="#" className="flex text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <FaCircleQuestion />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Help Center</span>}
        </Link>
        <Link href="#" className="flex text-white text-lg gap-x-3 items-center">
          <div className={`rounded-full p-2 ${pathName == "" ? "bg-purple-300 p-2" : ""}`}>
            <ImPowerCord />
          </div>
          {sidebarOpen && <span className="hover:text-purple-300">Integrations</span>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
