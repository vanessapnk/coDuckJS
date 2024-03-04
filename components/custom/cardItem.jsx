import { Button } from "@/components/ui/button";
import { FilterTab } from "./filterTab";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Location, ArrowCircleUp2 } from "iconsax-react";
const profileCheck = false;


export function CardItem({
  category,
  profileCheck,
  profileImage,
  title,
  location,
  description,
  stacks,
}) {

  const backgroundImageStyle = {
    backgroundImage: `url(${typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)})`,
    backgroundPosition: 'center',  // Alinhamento ao centro
    backgroundSize: 'cover',       // Preenchimento total
  };

  return (
    <div className="relative blockrounded-3xl p-1 "    >
      <div
        style={backgroundImageStyle}
        className="absolute inset-0 h-full w-full object-cover  transition-opacity rounded-3xl rounded-b-[1.8rem] pb-1 dark:bg-zinc-950"
      />

      <div className="relative rounded-3xl pt-16">
        <div className="mt-32 sm:mt-48 lg:mt-64 ">
          <div className="bg-zinc-950 rounded-3xl p-4 flex flex-col gap-4">
            <div>
              <div className="flex">
                <div className="w-9/12">
                  <h1 className="text-2xl font-semibold">{title}</h1>
                </div>
                <div className="w-3/12 flex items-end justify-start content-center flex-col
          text-white text-base font-semibold ">
                  <p>Vagas</p>
                  <p>01/10</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex justify-start gap-8">
                <div>
                  <p className="text-base opacity-70">Category</p>
                  <p className="text-lg">FrontEnd</p>
                </div>

                <div>
                  <p className="text-base opacity-70">Location</p>
                  <p className="text-lg">{location}</p>
                </div>

                <div>
                  <p className="text-base opacity-70">Languege</p>
                  <p className="text-lg">English</p>
                </div>
              </div>
              <div className="self-start p-3 rounded-full bg-zinc-800">
                <ArrowUpRight size={30} />
              </div>
            </div>
            <div>
              <p className="text-lg pb-1">Description</p>
              <p className="text-base opacity-70">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
