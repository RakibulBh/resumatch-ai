import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Hash, StickyNote } from "lucide-react";

export const AdditionalInformation = (form: any) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="applicationNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <StickyNote className="mr-2 h-4 w-4" />
              Application Notes
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional notes or comments about your application here..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="jobReferenceNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Hash className="mr-2 h-4 w-4" />
              Job Reference Number
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. JOB123456"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="applicationDeadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              Application Deadline
            </FormLabel>
            <FormControl>
              <Input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};
