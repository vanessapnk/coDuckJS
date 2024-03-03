import { DarkModeSwitch } from "@/components/custom/darkModeSwitch";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="h-screen container flex flex-col items-end">
      <Navbar homeActive={true} groupsActive={false} eventsActive={false} />
    </div>
  );
}
