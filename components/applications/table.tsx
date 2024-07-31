import React from "react";
import { Button } from "../ui/button";
import TableRow from "./table-row";

const tableCols = [
  { title: "Company" },
  { title: "Position" },
  { title: "Status" },
  { title: "Application Date" },
  { title: "Actions" },
];

const Table = () => {
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
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          <TableRow />
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
