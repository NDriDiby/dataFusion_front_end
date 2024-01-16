import FileInput from "@/components/FileInput";
import SalesTable from "@/components/SalesTable";
import React from "react";

function Home() {
  return (
    <div className="">
      Dashbord Home
      <div>
        <FileInput />
      </div>
      <div>
        <SalesTable />
      </div>
    </div>
  );
}

export default Home;
