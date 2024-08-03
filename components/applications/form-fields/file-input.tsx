"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip } from "lucide-react";

interface FileInputProps {
  onChange: (file: File | undefined) => void;
  accept?: string;
  id: string;
  label: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  onChange,
  accept,
  id,
  label,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onChange(file);
    } else {
      setFileName(null);
      onChange(undefined);
    }
  };

  return (
    <div className="mt-1 flex items-center">
      <Input
        type="file"
        accept={accept}
        className="hidden"
        id={id}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Label
        htmlFor={id}
        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <Paperclip className="mr-2 h-4 w-4" />
        {fileName || label}
      </Label>
    </div>
  );
};
