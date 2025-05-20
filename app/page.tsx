import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/home/HeroSection";
import {BgGradient} from "@/components/common/BgGradient";

import Image from "next/image";
import DemoSection from "@/components/home/DemoSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient/>
      <div className="flex flex-col  ">
        <HeroSection/>
        <DemoSection/>
      </div>
      
     
      {/* <HowItWorksSection/> 
      <PricingSection/> 
      <CTASection/> */}
    
     
    </div>
  );
}
