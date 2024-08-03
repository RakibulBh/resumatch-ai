"use client";
import React from "react";
import { FilePenLine, StickyNote, Trash2 } from "lucide-react";
import { convertDateFormat } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { deleteApplication } from "@/app/applications/actions";

const TableRow = ({ application }: { application: any }) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, mutateAsync, isPending } = useMutation({
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
      <td className="py-4 px-6 whitespace-nowrap">{application.jobTitle}</td>
      <td className="py-4 px-6 whitespace-nowrap">
        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
          {application.applicationStatus}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
        {convertDateFormat(application.applicationDate)}
      </td>
      <td className="py-4 px-6 whitespace-nowrap">
        <div className="flex gap-x-3">
          <button className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            <FilePenLine size={20} />
          </button>
          <button
            onClick={() => mutateAsync(application.id)}
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
