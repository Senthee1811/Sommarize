import OpenAI from "openai"; 
const openai = new OpenAI(
    {
        apiKey : process.env.OPENAI_API_KEY,

    }
) 
export async function generateSummaryFromOpenAI(pdfText:string){
    const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages:[
        {
            role:'system',
            content:'You are a helpful assistant.'
        },
        {
            role:'user',
            content: '',
        },
    ],
    temperature: 0.7,
    max_tokens: 1500
}); 

console.log(completion.choices[0].message);

}
