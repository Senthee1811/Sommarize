import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";

type PriceType = {
  name: string;
  description: string;
  price: number;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans: PriceType[] = [
  {
    name: "Basic",
    price: 9,
    description: "For a Beginner and Students",
    items: [
      "5 PDF Summarizes per month",
      "Standard processing speed",
      "Email Support",
    ],
    id: "basic",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Pro",
    price: 19,
    description: "For Professionals and Teams",
    items: [
      "Unlimited PDF Summarizes",
      "Priority processing",
      "24/7 Priority Support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "",
    priceId: "",
  },
];

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-all duration-300">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-xl border-[1px] border-gray-500/20",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between items-center gap-4">
          <div>
            <p className="text-lg lg:text-2xl font-bold capitalize">{name}</p>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-5xl tracking-tight font-extrabold">${price}</p>
            <div className="flex flex-col justify-end mb-[4px]">
              <p className="text-xs uppercase font-semibold">USD</p>
              <p className="text-xs">/month</p>
            </div>
          </div>
        </div>

        <ul className="space-y-2.5 leading-relaxed text-base">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center w-full mt-4">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 px-4",
              id === "pro" ? "border-rose-900" : "border-rose-100"
            )}
          >
            Buy Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* Title */}
        <div className="text-center pb-12">
          <h2 className="uppercase font-bold text-xl text-rose-500">Pricing</h2>
        </div>

        {/* Cards container */}
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
