import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin } from "lucide-react";
import { User } from "iconsax-react";
import { PorfileItemCard } from "../custom/profileItemCard";

export function UserTop({
  github,
  location,
  name,
  age,
  job,
  about,
  groups,
  events,
  languages,
  stacks,
}) {
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
        <div></div>
        <div>
          <h1 className="text-xl">
            {name}, {age}
          </h1>
          <p className="text-sm opacity-70">{job}</p>
          <div className="flex gap-2 items-center opacity-70">
            <MapPin size={12} strokeWidth={2} />
            <h2 className="text-sm">
              {location}
              {"   "}
              {github && (
                <a
                  href={`https://github.com/${github}`}
                  className="text-blue-500"
                >
                  @{github}
                </a>
              )}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-custom-green from-custom-yellow">
            {/* User Bio */}
            {name}
          </span>
          {/*  Scalable AI. */}
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            {about}
          </p>
        </h1>
      </div>
      {
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold">Bio</p>
          <p className="text-sm pb-4">{about}</p>
        </div>
      }
      <div className="flex gap-4 flex-col">
        <div className="flex gap-4">
          <PorfileItemCard
            bg="bg-custom-yellow"
            value={groups}
            name={groups === 1 ? "Group" : "Groups"}
          />
          <PorfileItemCard
            bg="bg-custom-lilac"
            value={events}
            name={"Events"}
          />
        </div>
        <div className="flex gap-4">
          {/* <PorfileItemCard
            bg="bg-custom-green"
            value={stacks.length}
            name={"Stacks"}
          /> */}
        </div>
      </div>
      <div className="flex gap-2 items-center"></div>
    </div>
  );
}
