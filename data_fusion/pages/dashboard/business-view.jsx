import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import React from "react";
import { Card, CardBody, CardFooter, Typography, Button, Select, Option } from "@material-tailwind/react";

function BusinessView() {
  return (
    <DashBoardLayout>
      <div className="ml-2 pt-2 mr-2">
        <h3 className="text-xl text-center font-extrabold text-slate-900">Business Overview</h3>
        <h6 className="text-xs text-center text-gray-400">Last update: Friday, January 19th, 2024</h6>
        <div className="grid md:grid-cols-3 gap-3">
          <Card className="mt-6 w-100 h-[350px] border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
            <CardBody>
              <div className="flex justify-between mb-5 ">
                <Typography variant="h5" className="mb-2 text-slate-900">
                  PROFIT AND LOSS
                </Typography>
                <div>Last Quater</div>
              </div>

              <div className="flex-col mb-5">
                <div className="text-lg font-bold">$10,000</div>
                <p className="text-xs text-gray-500">Net income for the last quater</p>
              </div>

              <div className="flex-col gruop mb-4">
                <div className="text-lg font-bold">$13,500</div>
                <p className="text-xs text-gray-500">Income</p>
              </div>

              <div className="flex-col">
                <div className="text-lg font-bold">$3,500</div>
                <p className="text-xs text-gray-500">Expenses</p>
              </div>
            </CardBody>
            {/* <CardFooter className="pt-0">
              <Button className="bg-purple-500 w-24">Read More</Button>
            </CardFooter> */}
          </Card>

          <Card className="mt-6 w-100 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
            <CardBody>
              <div className="flex justify-between mb-5 ">
                <Typography variant="h5" className="mb-2 text-slate-900">
                  EXPENSES
                </Typography>
                <div>Last Quater</div>
              </div>

              <div className="flex-col mb-5">
                <div className="text-lg font-bold">$3,500</div>
                <p className="text-xs text-gray-500">Total expenses</p>
              </div>

              <div className="text-md font-semibold mb-5">Top Categories</div>

              <div className="grid grid-cols-3 gap-5">
                <div className="flex-col">
                  <div className="text-lg font-bold">$500</div>
                  <p className="text-xs text-gray-500">Bills</p>
                </div>

                <div className="flex-col">
                  <div className="text-lg font-bold">$1,500</div>
                  <p className="text-xs text-gray-500">Salary</p>
                </div>

                <div className="flex-col">
                  <div className="text-lg font-bold">$500</div>
                  <p className="text-xs text-gray-500">Administrative</p>
                </div>

                <div className="flex-col">
                  <div className="text-lg font-bold">$500</div>
                  <p className="text-xs text-gray-500">Transportation</p>
                </div>

                <div className="flex-col">
                  <div className="text-lg font-bold">$500</div>
                  <p className="text-xs text-gray-500">Rent</p>
                </div>
              </div>
            </CardBody>
            {/* <CardFooter className="pt-0">
              <Button className="bg-purple-500 w-24">Read More</Button>
            </CardFooter> */}
          </Card>

          <Card className="mt-6 w-100 border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
            <CardBody>
              <div className="flex justify-between mb-5 ">
                <Typography variant="h5" className="mb-2 text-slate-900">
                  INCOME
                </Typography>
                <div>Last 30 days</div>
              </div>

              <div className="flex-col">
                <div className="text-lg font-bold">$55,900</div>
                <p className="text-xs text-gray-500">Total income</p>
              </div>
            </CardBody>
            {/* <CardFooter className="pt-0">
              <Button className="bg-purple-500 w-24">Read More</Button>
            </CardFooter> */}
          </Card>

          <Card className="mt-6 w-100 h-[350px] border border-purple-200 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
            <CardBody>
              <div className="flex justify-between mb-5 ">
                <Typography variant="h5" className="mb-2 text-slate-900">
                  SALES
                </Typography>
                <div>Last 30 days</div>
              </div>

              <div className="flex-col">
                <div className="text-lg font-bold">$93,800</div>
                <p className="text-xs text-gray-500">Total sales</p>
              </div>
            </CardBody>
            {/* <CardFooter className="pt-0">
              <Button className="bg-purple-500 w-24">Read More</Button>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    </DashBoardLayout>
  );
}

export default BusinessView;
