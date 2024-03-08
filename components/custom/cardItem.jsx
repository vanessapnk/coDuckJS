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
import { User, Location } from "iconsax-react";
const profileCheck = false;


export function CardItem({
  usersMin,
  usersLimit,
  modality,
  members,
  category,
  profileImage,
  title,
  location,
  description,
  stacks,
  languege,
}) {

  const backgroundImageStyle = {
    backgroundImage: `url(${typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)})`,
    backgroundPosition: 'center',  // Alinhamento ao centro
    backgroundSize: 'cover',       // Preenchimento total
  };

  const categoryColors = {
    'Frontend': 'bg-custom-blue',
    'Backend': 'bg-custom-green',
    'Data Analysis': 'bg-custom-lilac',
    'Other': 'bg-custom-orange',
    // Add more categories and colors as needed
  }

  return (
    <Card className="p-3 flex flex-col gap-2 bg-zinc-100 dark:bg-background">
      <div style={backgroundImageStyle} className="rounded-2xl mb-4 h-60">
        <div className="flex justify-end p-2">
          <div className="self-start p-3 rounded-full bg-background ">
            <ArrowUpRight className="dark:text-white" size={20} />
          </div>
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="w-9/12">
            <h1 className="text-base font-semibold normal-case">{title}</h1>
          </div>
          <div className="w-3/12 flex items-center gap-2 justify-end content-center flex-row
          dark:text-white  text-base font-semibold ">
            <User size="16" variant="Bulk" />
            <p>{usersMin} / {usersLimit}  </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div >
        <Badge variant="default" className={`border-none ${categoryColors[category]}`}>
            {category}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Location size="16" variant="Bulk" />
          <p className="text-lg normal-case">{location}</p>
        </div>
        <div>
          <p className="text-lg normal-case">{modality}</p>
        </div>

        <div>
          <p className="text-lg normal-case"> {languege} </p>
        </div>
      </div>
      <div>
        <p className="text-base opacity-70 normal-case">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 ">
              {stacks.map((stack, index) => (
                <Badge key={index} variant="default" className={"bg-slate-300 text-black mt-2"}>
                  {stack}
                </Badge>
              ))}
            </div>
      </div>
    </Card>
  );
}
