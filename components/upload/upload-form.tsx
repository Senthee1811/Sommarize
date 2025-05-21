'use client';
import UploadFormInput from "./upload-form-input";
import { z } from "zod";

export default function UploadForm(){

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        console.log('submitted');
        e.preventDefault();
        const formData = new FormData(e.currentTarget); 
        const file = formData.get('file') as File; 

        const schema = z.object({
        file: z.instanceof(File,{message:"Invalid File"})
        .refine((file) => file.size <= 2 * 1024 *1024,
            "File Size must be less than 20MB",
        )
        .refine((file) => file.type.startsWith("application/pdf"),
            "File Must be a PDF"
            )

    })


         const validatedFields = schema.safeParse({file}) 
         console.log(validatedFields);

         

    if(!validatedFields.success){
        console.log(
            validatedFields.error.flatten().fieldErrors.file?.[0]
            ?? "Invalid File"
        ); 
        return;

    }

     
    }

   
    

   
    return (
      <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
          <UploadFormInput onSubmit={handleSubmit}/>
      </div>
    )

}