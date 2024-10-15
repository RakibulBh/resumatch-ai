"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { IApplication } from "@/models/application";
import { EditApplicationForm } from "./edit-application-form";

const EditApplicationDialog = ({
  application,
}: {
  application: IApplication;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full">
          <Edit size={16} /> Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle className="truncate max-w-md">
          Edit application for {application.jobTitle}
        </DialogTitle>
        <EditApplicationForm application={application} />
      </DialogContent>
    </Dialog>
  );
};

export default EditApplicationDialog;
