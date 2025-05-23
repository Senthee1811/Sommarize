'use server'; 
import { fetchAndExtractPdfText} from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { generateSummaryFromGemini } from "@/lib/geminiai";
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
            summary = await generateSummaryFromGemini(pdfText);
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
       
        
    } catch (err) {
         return{
            success: false,
            message:"File Upload Failed",
            data:null
        }
        
    }

}