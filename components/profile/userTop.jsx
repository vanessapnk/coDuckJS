import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin } from "lucide-react";
import { User } from "iconsax-react";
import { PorfileItemCard } from "../custom/profileItemCard";

export function UserTop({ github, location, name, age, job, about, groups, events, langueges }) {
  return (
    <div>
      <div className="flex flex-row gap-4 py-6">
        <div>


          <Avatar className="rounded-2xl h-20 w-20">
            <AvatarImage
              src={`https://github.com/${github}.png`}
              alt="@shadcn"
            />
            <AvatarFallback>
              <User className="opacity-60" size="42" variant="Bold" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div>

        </div>
        <div>
          <h1 className="text-xl">{name}, {age}</h1>
          <p className="text-sm opacity-70">{job}</p>
          <div className="flex gap-2 items-center opacity-70">
            <MapPin size={12} strokeWidth={2} />
            <h2 className="text-sm">{location}</h2>
          </div>
          <p className="text-sm opacity-70">{github ? `@${github}` : ""}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold">Bio</p>
        <p className="text-sm pb-4">
          {about}
        </p>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4">
          <PorfileItemCard bg="bg-yellow-400" value={"10"} name={"Groups"} />
          <PorfileItemCard bg="bg-purple-400" value={"8"} name={"Events"} />
        </div>
        <div className="flex gap-4">
          <PorfileItemCard bg="bg-green-400" value={"10"} name={"Stacks"} />
        </div>
      </div>
      <div className="flex gap-2 items-center"></div>
    </div>
  );
}
