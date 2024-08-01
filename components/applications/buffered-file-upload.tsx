"use client";
import React, { useState, useEffect } from "react";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";

const BufferedFileUpload = ({
  field,
  label,
}: {
  field: any;
  label: string;
}) => {
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (field.value) {
      setFileName("File uploaded");
    }
  }, [field.value]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      field.onChange(buffer);
      setFileName(file.name);
    } else {
      field.onChange(undefined);
      setFileName(null);
    }
  };

  const handleRemoveFile = () => {
    field.onChange(undefined);
    setFileName(null);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full max-w-xs flex items-center justify-center"
              onClick={() =>
                document.getElementById(`file-upload-${label}`)?.click()
              }
            >
              {fileName ? (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  {fileName}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose file
                </>
              )}
            </Button>
            {fileName && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <input
            id={`file-upload-${label}`}
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default BufferedFileUpload;
