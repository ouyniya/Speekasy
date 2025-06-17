"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

// import "@uploadthing/react/styles.css"

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative mx-auto h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          type="button"
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
        className="border border-stone-300/50  ut-button:bg-primary ut-button:font-bold ut-button:text-sm ut-button:h-9 ut-button:rounded-md ut-button:ut-ready:bg-primary ut-button:ut-readying:bg-primary/40
        ut-button:ut-uploading:bg-primary/50
        ut-button:after:bg-primary ut-label:hover:text-primary ut-upload-icon:text-primary/75"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
