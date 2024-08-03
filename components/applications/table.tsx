"use client";
import React, { useState } from "react";
import TableRow from "./table-row";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getApplications } from "@/app/applications/actions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const tableCols = [
  { title: "Company" },
  { title: "Position" },
  { title: "Status" },
  { title: "Application Date" },
  { title: "Actions" },
];

const ITEMS_PER_PAGE = 10;

const Table = () => {
  const { user, isLoaded } = useUser();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: applications, isLoading } = useQuery({
    queryKey: [`applications`],
    queryFn: () => getApplications(user?.id),
    enabled: !!isLoaded,
  });

  const totalPages = applications
    ? Math.ceil(applications.length / ITEMS_PER_PAGE)
    : 0;
  const paginatedApplications = applications?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-indigo-600 text-white sticky top-0">
            <tr>
              {tableCols.map((col) => (
                <th
                  key={col.title}
                  className="py-4 px-6 text-left font-semibold"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {isLoading
              ? Array(ITEMS_PER_PAGE)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      {tableCols.map((col, colIndex) => (
                        <td key={colIndex} className="py-4 px-6">
                          <Skeleton />
                        </td>
                      ))}
                    </tr>
                  ))
              : paginatedApplications?.map((application: any) => (
                  <TableRow application={application} key={application._id} />
                ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-indigo-600 disabled:text-gray-400"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="text-indigo-600 disabled:text-gray-400"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
