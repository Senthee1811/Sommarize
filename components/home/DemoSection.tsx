import { Pizza } from "lucide-react";

export default function DemoSection(){
    return (
        <section className="relative">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
                <div
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%,72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 58.3%, 45.2% 34.5%,27.5% 76.7%, 0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
                    >
                    </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
                <Pizza className="w-6 h-6 text-rose-500 " />
                <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
                    Watch How Sommaire transforms this PDFs into an easy-to-read summary!

                </h3>
            </div>

            </div>
           
        </section>
    )
    
}