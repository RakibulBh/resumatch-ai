"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { AddApplicationForm } from "./add-application-form";

const AddApplicationDialog = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: any;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
          <PlusCircle className="mr-2" size={20} />
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogTitle>Add an application</DialogTitle>
        <AddApplicationForm onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationDialog;
