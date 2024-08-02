import React from "react";
import { FilePenLine, StickyNote } from "lucide-react";
import { convertDateFormat } from "@/lib/utils";

const TableRow = ({ application }: { application: any }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200">
      <td className="py-4 px-6">{application.companyName}</td>
      <td className="py-4 px-6">{application.jobTitle}</td>
      <td className="py-4 px-6">
        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
          {application.applicationStatus}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600">
        {convertDateFormat(application.applicationDate)}
      </td>
      <td className="py-4 px-6">
        <div className="flex gap-x-3">
          <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <StickyNote size={20} />
          </button>
          <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <FilePenLine size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
