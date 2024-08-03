import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { LinkedinIcon, User, UserPlus } from "lucide-react";
import { Controller } from "react-hook-form";

export const referralInfo = (form: any) => {
  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm">
      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <FormLabel className="text-base flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-indigo-500" />
            Referral
          </FormLabel>
          <FormDescription className="text-sm text-gray-500">
            Do you have a referral for this job application?
          </FormDescription>
        </div>
        <Controller
          name="referral"
          control={form.control}
          render={({ field: { onChange, value } }) => (
            <Switch checked={value} onCheckedChange={onChange} />
          )}
        ></Controller>
      </FormItem>

      <FormField
        control={form.control}
        name="referralSource"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <LinkedinIcon className="mr-2 h-4 w-4 text-indigo-500" />
              Referral Source
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. LinkedIn, Company Website, Job Fair"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500 mt-1">
              Where did you find this referral opportunity?
            </FormDescription>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="referralContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center text-sm font-medium text-gray-700">
              <User className="mr-2 h-4 w-4 text-indigo-500" />
              Referral Contact
            </FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. John Doe, jane@example.com"
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </FormControl>
            <FormDescription className="text-xs text-gray-500 mt-1">
              Name or contact information of your referral
            </FormDescription>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};
