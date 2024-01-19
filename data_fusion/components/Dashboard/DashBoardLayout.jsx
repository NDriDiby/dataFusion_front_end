import React from "react";
import Sidebar from "./Sidebar";

function DashBoardLayout({ children }) {
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>

      <main className="w-full">
        <div className="ml-2">CLOSE</div>
        <div>{children}</div>
      </main>
    </div>
  );
}

export default DashBoardLayout;
