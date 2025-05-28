import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import React from "react";

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement>; // ✅ Accept the formRef
}

export default function UploadFormInput({ onSubmit, formRef }: UploadFormInputProps) {
  return (
    <div>
      <form ref={formRef} className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5">
          <Input
            type="file"
            name="file"
            id="file"
            accept="application/pdf" // ✅ Fix typo here
            required
            className=""
          />
          <Button type="submit">Upload Your PDF</Button>
        </div>
      </form>
    </div>
  );
}
