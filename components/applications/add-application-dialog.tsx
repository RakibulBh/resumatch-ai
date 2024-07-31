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
import AddApplicationForm from "./add-application-form";

const AddApplicationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
          <PlusCircle className="mr-2" size={20} />
          Add Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader></DialogHeader>
        <AddApplicationForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationDialog;
