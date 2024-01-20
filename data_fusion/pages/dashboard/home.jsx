import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import FileInput from "@/components/Dashboard/FileInput";
import KPI from "@/components/Dashboard/Sales/KPI";
import SalesTable from "@/components/Dashboard/Sales/SalesTable";
import { backEnd, createBackendInstance } from "@/features/AuthSlice";
import React from "react";
import axios from "axios"; // Assuming you use axios for HTTP requests

function Home({ initialSalesData }) {
  return (
    <DashBoardLayout>
      <div className="text-center">
        {/* <h3 className="text-xl text-center font-extrabold text-slate-900">Dashbord Home</h3>
        <h6 className="text-xs text-gray-400">Last update: Friday, January 19th, 2024</h6> */}
        <KPI />
        <div>
          <SalesTable />
        </div>
      </div>
    </DashBoardLayout>
  );
}

// export async function getStaticProps({ res }) {
//   const host = res.req.headers.host.split(".")[0];
//   console.log("res", res);
// }

export default Home;

// export const getServerSideProps = async ({ req }) => {
//   try {
//     const host = req.headers.host.split(".")[0];
//     console.log("host", host);

//     const backend = createBackendInstance(host);
//     console.log("backend", backend);

//     const response = backend.get("/sales/");

//     // Additional logic or props configuration...
//     return { props: {} };
//   } catch (error) {
//     console.error("Error in getServerSideProps:", error);
//     // Handle the error appropriately
//     return { props: {} };
//   }
// };
