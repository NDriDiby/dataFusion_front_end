import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import FileInput from "@/components/Dashboard/FileInput";
import KPI from "@/components/Dashboard/Sales/KPI";
import SalesTable from "@/components/Dashboard/Sales/SalesTable";
import { backEnd } from "@/features/AuthSlice";
import React from "react";

function Home() {
  return (
    <DashBoardLayout>
      <div className="">
        <div className="text-center">
          <h3 className="text-xl text-center font-extrabold text-slate-900">Dashbord Home</h3>
          <h6 className="text-xs text-gray-400">Last update: Friday, January 19th, 2024</h6>
        </div>
        <KPI />
        <div>
          <SalesTable />
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default Home;

// export const getServerSideProps = async ({ res }) => {
//   // const host = res.req.headers.host.split(".")[1];
//   // const backend = createBackendInstance(host);

//   const response = await backEnd.get("/sales/");
//   console.log("response", response.data);

//   // Set cache headers
//   res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=3600");

//   return {
//     props: {
//       // domain: host,
//       salesData: response.data || null,
//     },
//   };
// };
