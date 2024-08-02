"use client";
import React from "react";
import TableRow from "./table-row";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/app/applications/actions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tableCols = [
  { title: "Company" },
  { title: "Position" },
  { title: "Status" },
  { title: "Application Date" },
  { title: "Actions" },
];

const Table = () => {
  const { user, isLoaded } = useUser();

  const [isLoading, setisLoading] = React.useState(true);

  const { data: applications } = useQuery({
    queryKey: [`applications`],
    queryFn: () => getApplications(user?.id),
    enabled: !!isLoaded,
  });

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-indigo-600 text-white">
            {tableCols.map((col) => (
              <th key={col.title} className="py-4 px-6 text-left font-semibold">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {applications &&
            applications.map((application: any) => (
              <TableRow application={application} key={application._id} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
