"use client";

import React from "react";
import {
  Edit,
  FilePenLine,
  FileText,
  MoreVertical,
  Plus,
  StickyNote,
  Trash2,
} from "lucide-react";
import { convertDateFormat } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { deleteApplication } from "@/app/applications/actions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IApplication } from "@/models/application";
import EditApplicationDialog from "./edit-application-dialog";

const statusColors: { [key: string]: string } = {
  applied: "bg-blue-100 text-blue-800",
  interview: "bg-yellow-100 text-yellow-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  pending: "bg-gray-100 text-gray-800",
};

const TableRow = ({ application }: { application: IApplication }) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (applicationId: string) =>
      deleteApplication(applicationId, user?.id),
    onError: (error) => {
      return alert(error.message || "Failed to update");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  return (
    <tr className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200">
      <td className="py-4 px-6 whitespace-nowrap">{application.companyName}</td>
      <td className="py-4 px-6 whitespace-nowrap truncate max-w-xs">
        {application.jobTitle}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">{application.jobType}</td>
      <td className="py-4 px-6 whitespace-nowrap">
        <span
          className={`${
            statusColors[application.applicationStatus]
          } py-1 px-3 rounded-full text-sm font-medium`}
        >
          {application.applicationStatus}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
        {convertDateFormat(application.applicationDate)}
      </td>
      <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
        {application.applicationDeadline
          ? convertDateFormat(application.applicationDeadline)
          : "N/A"}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="flex gap-x-3">
          <Popover>
            <PopoverTrigger>
              <button>
                <MoreVertical size={20} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-40">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
                <FileText size={16} /> View Details
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
                <Edit size={16} /> Status
              </button>
              <EditApplicationDialog application={application} />
              <button
                className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full text-red-600"
                onClick={() => mutateAsync(application.id)}
                disabled={isPending}
              >
                <Trash2 size={16} /> Delete
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
