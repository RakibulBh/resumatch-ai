import React from "react";
import { Button } from "../ui/button";
import TableRow from "./table-row";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/app/applications/actions";

const tableCols = [
  { title: "Company" },
  { title: "Position" },
  { title: "Status" },
  { title: "Application Date" },
  { title: "Actions" },
];

const Table = () => {
  const { user } = useUser();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`application`],
    queryFn: async () => {
      const data = await getApplications(user?.id);
      return data;
    },
    refetchOnMount: false,
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
          {data?.map((application) => (
            <TableRow key={application._id} />
          ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
