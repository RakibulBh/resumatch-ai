import { CheckCircle, Upload } from "lucide-react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export const FileUpload = ({ field, label }: { field: any; label: string }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      setFileName(file.name);
    }
  };

  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {fileName ? (
              <div className="text-sm text-gray-600">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p>{fileName} uploaded successfully</p>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <Label
                    htmlFor={label}
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <Input
                      id={label}
                      name={label}
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                  </Label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
