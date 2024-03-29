import { useUserAuth } from "@/pages/_app";
import {
  User,
  SearchNormal1,
  GlobalSearch,
  People,
  Calendar2,
} from "iconsax-react";
import Link from "next/link";

export function Navbar({
  profileActive,
  exploreActive,
  groupsActive,
  eventsActive,
}) {
  const { user, login } = useUserAuth((state) => state);
  console.log(user);

  if (Object.keys(user).length === 0) {
    return <div>LOADING PROFILE</div>;
  }

  return (
    <div className="p-4">
      <div className="bg-zinc-100 dark:bg-zinc-900 p-2 text-center rounded-3xl fixed bottom-4 left-4 right-4 ">
        <div className="h-full  flex gap-2 items-center justify-evenly align-center">
          <Link href={`/profile/${user.userData._id}`}>
            <div className="flex items-center flex-col justify-center cursor-pointer">
              <User
                className={`${
                  profileActive ? "text-blue-400" : "text-white-400"
                }`}
                size="24"
                variant={profileActive ? "Bulk" : "Outline"}
              />
              <p
                className={`${
                  profileActive ? "text-blue-400" : "text-white-400"
                }`}
              >
                Profile
              </p>
            </div>
          </Link>

          <Link href={"/explore"}>
            <div className="flex items-center flex-col justify-center cursor-pointer">
              <SearchNormal1
                className={`${
                  exploreActive ? "text-blue-400" : "text-white-400"
                }`}
                size="24"
                variant={exploreActive ? "Bulk" : "Outline"}
              />
              <p
                className={`${
                  exploreActive ? "text-blue-400" : "text-white-400"
                }`}
              >
                Explore
              </p>
            </div>
          </Link>

          <Link href={"/groups"}>
            <div className="flex items-center flex-col justify-center cursor-pointer">
              <People
                className={`${
                  groupsActive ? "text-blue-400" : "text-white-400"
                }`}
                size="24"
                variant={groupsActive ? "Bulk" : "Outline"}
              />
              <p
                className={`${
                  groupsActive ? "text-blue-400" : "text-white-400"
                }`}
              >
                Groups
              </p>
            </div>
          </Link>

          <Link href={"/events"}>
            <div className="flex items-center flex-col justify-center cursor-pointer">
              <Calendar2
                className={`${
                  eventsActive ? "text-blue-400" : "text-white-400"
                }`}
                size="24"
                variant={eventsActive ? "Bulk" : "Outline"}
              />
              <p
                className={`${
                  eventsActive ? "text-blue-400" : "text-white-400"
                }`}
              >
                Events
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
