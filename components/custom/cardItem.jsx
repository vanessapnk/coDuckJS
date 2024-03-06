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
}) {

  const backgroundImageStyle = {
    backgroundImage: `url(${typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)})`,
    backgroundPosition: 'center',  // Alinhamento ao centro
    backgroundSize: 'cover',       // Preenchimento total
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        dsds
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
