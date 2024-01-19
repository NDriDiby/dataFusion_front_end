import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import FileInput from "@/components/Dashboard/FileInput";
import KPI from "@/components/Dashboard/Sales/KPI";
import SalesTable from "@/components/Dashboard/Sales/SalesTable";
import React from "react";

function Home() {
  return (
    <DashBoardLayout>
      <div className="">
        <div className="text-xl text-center font-bold">Dashbord Home</div>

        <KPI />
        <div>
          <SalesTable />
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Home;

{
  /* <div className="">
        Dashbord Home
        <div>
          <FileInput />
        </div>
        <div>
          <SalesTable />
        </div>
      </div> */
}
