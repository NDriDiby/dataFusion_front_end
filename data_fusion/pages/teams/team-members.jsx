import DashBoardLayout from "@/components/Dashboard/DashBoardLayout";
import React from "react";
import { FaEllipsisVertical, FaFilter, FaPlus, FaSquareXmark } from "react-icons/fa6";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Job Title", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Marketing",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Developer",
    org: "Technology",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Finance",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Developer",
    org: "Technology",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "HR",
    date: "04/10/21",
  },
];

function TeamMembers() {
  return (
    <DashBoardLayout>
      <div className="ml-2 pt-2 mr-2">
        <div className="flex">
          <div className="flex-cols items-center flex-1 ">
            <h3 className="text-xl text-center font-extrabold text-slate-900">Team Members</h3>
            <h6 className="text-xs text-center text-gray-400">Last update: Friday, January 19th, 2024</h6>
          </div>
          <Button className="bg-purple-500 w-auto p-3 hover:bg-blue-100 hover:text-slate-900 ">
            <span className="mr-2">+</span>Add member
          </Button>
        </div>

        <Card className="mt-6 w-full overflow-scroll border border-gray-300">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="bg-blue-100">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" className="font-bold leading-none uppercase text-slate-900">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, email, job, org, date }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast ? "p-4 " : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name} className="hover:bg-gray-100 cursor-pointer">
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {name}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                          {email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {job}
                        </Typography>
                        <Typography variant="small" color="blue-gray" className="font-normal opacity-70">
                          {org}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        Edit
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </DashBoardLayout>
  );
}

export default TeamMembers;
