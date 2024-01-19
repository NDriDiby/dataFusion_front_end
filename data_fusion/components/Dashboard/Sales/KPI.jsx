import React from "react";
// Import icons (ensure you have react-icons installed)
import { FaDollarSign, FaShoppingCart, FaChartLine } from "react-icons/fa";

function KPI() {
  const KPIdata = [
    { title: "Total Sales", value: "250", icon: <FaShoppingCart />, bgColor: "bg-white" },
    { title: "Total Revenues", value: "120,000", icon: <FaDollarSign />, bgColor: "bg-white" },
    { title: "New Customers", value: "80", icon: <FaChartLine />, bgColor: "bg-white" },
    { title: "Total Sales", value: "250", icon: <FaShoppingCart />, bgColor: "bg-white" },

    // Add more KPIs here
  ];

  return (
    <div className="mt-8">
      <div className="flex justify-between px-2 space-x-2">
        {KPIdata.map((kpi, index) => (
          <div key={index} className={`w-[200px] h-[100px] cursor-pointer border ${kpi.bgColor} hover:shadow-md rounded-lg`}>
            <div className="flex flex-col flex-wrap gap-y-2 justify-center items-center h-full">
              <div className="text-2xl font-bold text-slate-900">
                <h5>{kpi.value}</h5>
              </div>
              <div className="flex items-center gap-x-2">
                <div>{kpi.icon}</div>
                <div>
                  <h4>{kpi.title}</h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KPI;
