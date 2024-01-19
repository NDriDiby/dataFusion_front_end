import KPI from "@/components/Dashboard/Budget/KPI";
import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import React from "react";

function Home() {
  return (
    <DashBoardLayout>
      <div>
        <div className="text-xl text-center font-bold">Budget</div>
        <KPI />
      </div>
    </DashBoardLayout>
  );
}

export default Home;
