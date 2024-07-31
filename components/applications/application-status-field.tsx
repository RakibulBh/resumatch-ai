import { cn } from "@/lib/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";

// Define the possible status values
type ApplicationStatus =
  | "Not Applied"
  | "Applied"
  | "Application Under Review"
  | "Interview Scheduled"
  | "Interviewed"
  | "Second Interview"
  | "Offer Received"
  | "Offer Accepted"
  | "Offer Declined"
  | "Rejected";

// Define the color map
const colorMap: Record<ApplicationStatus, string> = {
  "Not Applied": "bg-gray-100 text-gray-800",
  Applied: "bg-blue-100 text-blue-800",
  "Application Under Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-purple-100 text-purple-800",
  Interviewed: "bg-indigo-100 text-indigo-800",
  "Second Interview": "bg-pink-100 text-pink-800",
  "Offer Received": "bg-green-100 text-green-800",
  "Offer Accepted": "bg-emerald-100 text-emerald-800",
  "Offer Declined": "bg-orange-100 text-orange-800",
  Rejected: "bg-red-100 text-red-800",
};

interface StatusTagProps {
  status: ApplicationStatus;
  selected: boolean;
  onClick: (status: ApplicationStatus) => void;
}

export const StatusTag: React.FC<StatusTagProps> = ({
  status,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(status)}
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium transition-all",
        colorMap[status],
        selected
          ? "ring-2 ring-offset-2 ring-indigo-500"
          : "opacity-70 hover:opacity-100"
      )}
    >
      {status}
    </button>
  );
};

interface ApplicationStatusFieldProps {
  field: {
    value: ApplicationStatus;
    onChange: (value: ApplicationStatus) => void;
  };
}

const ApplicationStatusField: React.FC<ApplicationStatusFieldProps> = ({
  field,
}) => {
  const statuses: ApplicationStatus[] = [
    "Not Applied",
    "Applied",
    "Application Under Review",
    "Interview Scheduled",
    "Interviewed",
    "Second Interview",
    "Offer Received",
    "Offer Accepted",
    "Offer Declined",
    "Rejected",
  ];

  return (
    <FormItem className="space-y-3">
      <FormLabel className="text-sm font-medium text-gray-700">
        Application Status <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <StatusTag
              key={status}
              status={status}
              selected={field.value === status}
              onClick={(value) => field.onChange(value)}
            />
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ApplicationStatusField;
