import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin } from "lucide-react";
import { User } from "iconsax-react";

export function UserTop({ userId, github, location, name, age, job, about, }) {
  return (
    <div>
      <div className="flex flex-row gap-4 py-6">
        <Avatar className="rounded-2xl h-20 w-20">
          <AvatarImage
            src={`https://github.com/${github}.png`}
            alt="@shadcn"
          />
          <AvatarFallback>
            <User className="opacity-60" size="42" variant="Bold" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl">{name}, {age}</h1>
          <p className="text-sm opacity-70">{job}</p>
          <div className="flex gap-2 items-center opacity-70">
            <MapPin size={12} strokeWidth={2} />
            <h2 className="text-sm">{location}</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm pb-4">
          {about}
        </p>
      </div>
      <div className="flex gap-2 items-center"></div>
    </div>
  );
}
