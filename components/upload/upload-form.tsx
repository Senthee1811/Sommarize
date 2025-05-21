'use client';

import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner"; // ✅ Correct usage

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a PDF"),
});

export default function UploadForm() {
  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully");
      toast.success("✅ Upload successful", {
        description: "Your PDF has been uploaded!",
      });
    },
    onUploadError: (err) => {
      console.error("Upload failed due to error", err);
      toast.error("❌ Upload Failed", {
        description: err.message,
      });
    },
    onUploadBegin: ({ file }) => {
      console.log("Upload has begun for", file);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submitted");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;

    const validatedFields = schema.safeParse({ file });
    console.log(validatedFields);

    if (!validatedFields.success) {
      toast.error("❌ Invalid File", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ??
          "Please provide a valid PDF file.",
      });
      return;
    }

    toast("📥 Uploading PDF...", {
      description: "We are uploading your PDF...",
    });

    const resp = await startUpload([file]); // ✅ Accepts File[]
    if (!resp) {
      toast.error("❌ Upload Failed", {
        description: "Please try uploading a different file.",
      });
      return;
    }

    toast("📃 Processing PDF", {
      description: "Hang tight, our AI is processing your document ✨",
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}
