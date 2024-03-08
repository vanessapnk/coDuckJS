import {
  User,
  SearchNormal1,
  GlobalSearch,
  People,
  Calendar2,
  Message2,
} from "iconsax-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function NavAction({ title, url, onClick }) {
  return (
    <div className="p-4">
      <div className="bg-zinc-100 dark:bg-slate-900 p-2 text-center  fixed bottom-0 left-0 right-0 ">
        <div className="h-full flex gap-2 items-center justify-evenly align-center">


          <Button onClick={onClick} className="text-slate-800 w-full">{title}</Button>


          <Link href={url}>
            <Button className="text-slate-800 w-full">
              <div className="flex items-center justify-center gap-2">
                Chat
                <Message2 size="16" variant="Bold" />
              </div>

            </Button>

          </Link>

        </div>
      </div>
    </div>
  );
}
