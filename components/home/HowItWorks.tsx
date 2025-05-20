import { BrainCircuit, FileOutput, FileText } from "lucide-react";
import { ReactNode } from "react"
type Step = {
    icon:ReactNode; 
    label:string,
    description:string
}


const steps:Step[] = [
    {
        icon: <FileText size={64} strokeWidth={1.5}/>,
        label: "Upload Your PDF",
        description:"Simply Drag and Drop your PDF file here or click to browse and upload."
    },
    {
         icon: <BrainCircuit size={64} strokeWidth={1.5}/>,
        label: "AI Analysis",
        description:"Our Advanced AI process and analyzes the Document"
    },
    {
         icon: <FileOutput size={64} strokeWidth={1.5}/>,
        label: "Get Your Summary",
        description:"Get your Summary in seconds and save hours of reading time."
    }

]



export default function HowItWorksSection(){

    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                 <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30">
                <div
                style={{
                    clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
                    >
                    </div>
            </div>
            <div className="text-center mb-16">
                <h2 className="font-bold text-xl uppercase mb-4 text-rose-500">How It Works</h2>
                <h3 className="font-bold text-3xl max-w-2xl mx-auto">Transform any PDFs into an easy-to-digest
                     summary in three simple steps </h3>
            </div>
            <div className="grid grid-cols-1 md:grid=cols-3 gap-8 max-w-6xl mx-auto relative">
                {steps.map((step,idx) => (
                    <StepItem key={idx} {...step}/>

                   

                ))}
            </div>
            </div>
        </section>
    )
} 

function StepItem({icon,label,description}:Step){
    return <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs
    border border-white/10 hover:border-rose-500/50 transition-colors group w-full">
       <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-br from-rose-500/50 to-transparent
        group-hover:from-rose-500/20 transition-colors ">
            <div className="text-rose-500"> {icon}</div>
        </div>
        <div className="flex flex-col flex-1 gap-1 justify-between">
             <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>

        </div>
         
       </div>
       
      

    </div>

}