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

export function NavEvent({ title, onClick }) {
  return (
    <div className="p-4">
      <div className="bg-zinc-100 dark:bg-slate-900 p-2 text-center  fixed bottom-0 left-0 right-0 ">
        <div className="h-full flex gap-2 items-center justify-evenly align-center">
          <Button type="submit" onClick={onClick} className="text-slate-800 w-full">{title}</Button>
        </div>
      </div>
    </div>
  );
}
