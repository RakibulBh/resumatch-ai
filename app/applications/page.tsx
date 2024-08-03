"use client";
import React, { useState } from "react";
import Table from "@/components/applications/table";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Check,
  Filter,
  MessageCircle,
  Search,
  X,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import AddApplicationDialog from "@/components/applications/add-application-dialog";
import TopBar from "@/components/applications/top-bar";

function ApplicationsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TopBar />

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <AddApplicationDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search applications"
                className="bg-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg flex items-center justify-center w-full sm:w-auto">
              <Filter className="mr-2" size={20} />
              Filter
              <ChevronDown className="ml-2" size={16} />
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <Table />
        </div>
      </main>
    </div>
  );
}

export default ApplicationsPage;
