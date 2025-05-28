'use server'; 
import { fetchAndExtractPdfText} from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import {auth} from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import {formatFileNameAsTitle} from "@/utils/formatutils"
import { revalidatePath } from "next/cache";



interface PdfSummaryType{
    userId?: string;
    fileUrl: string;
    summary: string;
    status?: string;
    title: string;
    fileName: string;
}



export async function generatePdfSummary(uploadResponse:[{
    serverData:{
        userId: string;
        file:{
            url:string; 
            name:string;
        }
    }
}]){
    if(!uploadResponse){
        return{
            success: false,
            message:"File Upload Failed",
            data:null
        }
    }

    const {serverData:{
        userId,
        file: {url: pdfUrl,name: fileName}
    }} = uploadResponse[0]

    if(!pdfUrl){
         return{
            success: false,
            message:"File Upload Failed",
            data:null,
        }
    } 

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl); 
       
    
    
        let summary;
       
        try {
            summary = await generateSummaryFromOpenAI(pdfText);
            console.log({summary})

            
        } catch (error) {
            console.log(error);

            if(error instanceof Error && error.message.includes("Rate limit exceeded")){
                try {
                    summary = await generateSummaryFromGemini(pdfText);
                    
                } catch (geminiError) {
                    console.log('Gemini API failed after OpenAI quota',
                        geminiError
                    ); 
                    throw new Error (
                        'All AIS have been called off due to API conflict'
                    )
                    
                }
            }
            
        } 

        if(!summary){
            return{
                success: false,
                message:"Failed to generate summary",
                data:null
            }
        } 

        const formattedFileName = formatFileNameAsTitle(fileName)
        return {
            success:true,
            message:"Summary generated Succesfully",
            data:{
                title:formattedFileName,
                summary,
            }
        }
       
        
    } catch (err) {
         return{
            success: false,
            message:"File Upload Failed",
            data:null
        }
        
    }

} 

async function savePdfSummary({userId,fileUrl,summary,title,fileName}:{
    userId:string,fileUrl:string,summary:string,title:string,fileName:string
}){
    try {
        const sql = await getDbConnection(); 
        await sql `INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summarytext,
        status,
        title,
        file_name
        ) VALUES (
         ${userId},
         ${fileUrl},
         ${summary},
         'completed',
         ${title},
         ${fileName}

         );`;
    } catch (error) {
        console.error("Error on Saving PDF summaries",error);
        
    }

}

export async function storePdfSummaryAction({

            fileUrl,
            summary,
            title,
            fileName,
}:PdfSummaryType){

    let savedSummary: any;
    try {
        const {userId} = await auth();

        if(!userId){
            return{
                success:false,
                message:"User Not Found",
            };
        }
        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if(!savedSummary){
            return{
                success:false,
                message:"Failed to store the summary, please Try Again",
            }
        } 

        

        
        
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message:"Failed to store the summary",
        }
        
    }

    revalidatePath(`/summaries/${savedSummary.id}`)

    return{
            success:true,
            message:"PDF summary saved successfully"
        }

}