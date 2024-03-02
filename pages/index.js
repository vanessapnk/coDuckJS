import { DarkModeSwitch } from "@/components/custom/darkModeSwitch";
import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Button variant="outline">Button</Button>
      <div>Oláhfghjfgshd</div>
      <DarkModeSwitch />
    </>
  );
}
