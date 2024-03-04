import { Button } from "@/components/ui/button";
import { FilterTab } from "../custom/filterTab";
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
import { Location } from "iconsax-react";
const profileCheck = false;

export function CardProfile({
  category,
  profileCheck,
  profileImage,
  title,
  location,
  description,
  likes,
  stacks,
}) {
  return (
    <Card className=" border-0 rounded-3xl">
      <div className="flex flex-col gap-2">
        {profileCheck ? (
          <AspectRatio ratio={16 / 9} >
            <Image
              src={`${profileImage}`}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-2xl object-cover"
            />
          </AspectRatio>
        ) : (
          ""
        )}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="flex gap-2 items-center opacity-70">
              <Location size="14" variant="Bulk" className="text-black dark:text-white" />
              <h2 className="text-sm"> {location} Porto, pt </h2>
            </div>
          </div>

          <p className="text-sm opacity-70">{description}</p>
          {stacks && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="text-base">Stacks</h1>
                <h1 className="text-base">2/5</h1>
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {stacks.map((stack, index) => (
                    <Badge key={index} variant="profile">
                      {stack}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </Card>
  );
}
