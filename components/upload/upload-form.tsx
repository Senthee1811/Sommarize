'use client';
import { useRef } from "react";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./upload-form-input";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid File" })
    .refine((file) => file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
    .refine((file) => file.type.startsWith("application/pdf"), "File must be a PDF"),
}); 



/**
 * Component for handling PDF file uploads and processing.
 *
 * This component utilizes a form to allow users to upload PDF files, which are then validated
 * and uploaded to a server. Upon successful upload, the PDF is processed to generate a summary.
 * The component also handles various states such as upload initiation, completion, and errors,
 * providing appropriate user feedback with toast notifications.
 *
 * @returns A JSX element containing the upload form and its functionalities.
 */

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null); // ✅ Define the ref

  const router = useRouter();
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
    if (!validatedFields.success) {
      toast.error("❌ Invalid File", {
        description:
          validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Please provide a valid PDF file.",
      });
      return;
    }

    toast("📥 Uploading PDF...", {
      description: "We are uploading your PDF...",
    });

    const resp = await startUpload([file]);
    console.log("resp:",resp)
    if (!resp) {
      toast.error("❌ Upload Failed", {
        description: "Please try uploading a different file.",
      });
      return;
    }

    toast("📃 Processing PDF", {
      description: "Hang tight, our AI is processing your document ✨",
    });

    const result = await generatePdfSummary(resp);
    console.log("result", result);
    const { data = null, message = null } = result || {};

    if (data) {
      let storeResult :any; 
      toast.success("✅ PDF Processed", {
        description: "Summary processed successfully & saving.",
      });

     
      if (data.summary) {
       storeResult =  await storePdfSummaryAction({
          fileUrl: resp[0].serverData.file.url,
          summary: data.summary,
          title: data.title,
          fileName: file.name, // 🔁 Make sure to pass the required `userId`
              // 🔁 Include any required fields
        });

        toast.success("✅ Summary Generated", {
          description: "Your summary has been stored successfully.",
        }); 

        formRef.current?.reset();
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput onSubmit={handleSubmit} formRef={formRef} />
    </div>
  );
}
