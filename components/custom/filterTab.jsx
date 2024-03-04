import { Location } from "iconsax-react";

export function FilterTab() {
    return (
        <>
            <div className="flex flex-row items-center gap-2 justify-between content-center">
                <button className="rounded-2xl w-full flex gap-2 p-2 bg-zinc-200 dark:bg-zinc-900 ">
                    <div>
                        <Location size="22" className="dark:text-white" variant="Bulk" />
                    </div>
                    <div>
                        <p className="text-base">Proximity</p>
                    </div>
                </button>

                <button className="rounded-2xl  w-full flex gap-2 p-2 bg-zinc-200 dark:bg-zinc-900 ">
                    <div>
                        <Location size="22" className="dark:text-white" variant="Bulk" />
                    </div>
                    <div>
                        <p className="text-base">Availability</p>
                    </div>
                </button>

                <button className="rounded-2xl  w-full flex gap-2 p-2 bg-zinc-200 dark:bg-zinc-900 ">
                    <div>
                        <Location size="22" className="dark:text-white" variant="Bulk" />
                    </div>
                    <div>
                        <p className="text-base">Stacks</p>
                    </div>
                </button>
            </div>
        </>
    )
}