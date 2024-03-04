import { Location } from "iconsax-react";

export function FilterItem({}) {
    return (
        <div className="rounded-2xl flex gap-2 p-2 bg-zinc-200 dark:bg-zinc-900 ">
            <div>
                <Location size="22" className="dark:text-white" variant="Bulk" />
            </div>
            <div>
                <p className="text-base">Locations</p>
            </div>
        </div>
    )
}