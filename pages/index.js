import { DarkModeSwitch } from "@/components/custom/darkModeSwitch";
import { Navbar } from "@/components/custom/navbar";
import { Button } from "@/components/ui/button"
import { Inter } from "next/font/google";
import Groups from "./groups";
import { BadgeCheck } from "@/components/custom/badgeCheck";
import { useState } from "react";
import Login from "./login";
import Explore from "./explore";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  return (
    <>
      {/* {isAuth ? <Explore /> : <Login />} */}
      <Login />
    </>
  );
}
