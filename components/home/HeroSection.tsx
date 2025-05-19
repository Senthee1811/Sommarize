import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function HeroSection(){
    return (
        <section className="">
            <div className="">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-600 animate-gradient-x ">
                    <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
                    <Sparkles className="h-6 w-6 mr-2 text-rose-600 animate-pulse"/>


                <p>Powered by AI</p>
                </Badge></div>
                <h1>Transform PDFs into concise summaries</h1>
                <h2>Get a beautiful summary of the document in seconds.</h2>
                <Button>Try Sommaire</Button>
            </div>
        </section>
    )
    
}