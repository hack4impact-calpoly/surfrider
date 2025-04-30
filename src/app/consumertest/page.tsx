import { ConsumerImpactCard } from "@/components/consumer-impact-card";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import GasIcon from "@/assets/icons/gas_pump.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <TooltipProvider>
        <div>
          <ConsumerImpactCard
            value={123456}
            label="Gallons"
            subtext="of Gasoline Burned"
            tooltipText="sample tooltip info"
            icon={<Image src={GasIcon} alt="Gas pump icon" className="h-12 w-12" />}
            bgColor="bg-[#94CEEE]"
          />
        </div>
      </TooltipProvider>
    </main>
  );
}
