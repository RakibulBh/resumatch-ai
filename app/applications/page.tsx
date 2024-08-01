import React from "react";
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

const cards = [
  {
    icon: <Briefcase className="text-indigo-600" />,
    title: "Total Applications",
    value: 3,
  },
  {
    icon: <MessageCircle className="text-indigo-600" />,
    title: "Total Interviews",
    value: 2,
  },
  {
    icon: <Check className="text-green-600" />,
    title: "Total Offers",
    value: 1,
  },
  {
    icon: <X className="text-red-600" />,
    title: "Total Rejections",
    value: 0,
  },
];

function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-indigo-100 rounded-md p-3">
                        {card.icon}
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.title}
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {card.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <AddApplicationDialog />
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search applications"
                  className="bg-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-2 px-4 rounded-lg flex items-center">
                <Filter className="mr-2" size={20} />
                Filter
                <ChevronDown className="ml-2" size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <Table />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ApplicationsPage;
