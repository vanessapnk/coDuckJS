import { User, Message2, GlobalSearch, People } from "iconsax-react";
import Link from "next/link";

export function Navbar({ profileActive, groupsActive, eventsActive, chatActive }) {
    return (


        <div className="p-4">
            <div className="bg-zinc-900 p-2 text-center rounded-3xl fixed bottom-4 left-4 right-4 ">
                <div className="h-full  flex gap-2 items-center justify-evenly align-center">
                    <Link href={"/profile"}>
                        <div className="flex items-center flex-col justify-center cursor-pointer">
                            <User className={`${profileActive ? "text-blue-400" : "text-white-400"}`} size="24"
                                variant={profileActive ? "Bulk" : "Outline"} />
                            <p className={`${profileActive ? "text-blue-400" : "text-white-400"}`}>Profile</p>
                        </div>
                    </Link>
                    <Link href={"/"}>
                        <div className="flex items-center flex-col justify-center cursor-pointer">
                            <People className={`${groupsActive ? "text-blue-400" : "text-white-400"}`} size="24"
                                variant={groupsActive ? "Bulk" : "Outline"} />
                            <p className={`${groupsActive ? "text-blue-400" : "text-white-400"}`}>Groups</p>
                        </div>
                    </Link>

                    <Link href={"/groupsList"}>
                        <div className="flex items-center flex-col justify-center cursor-pointer">
                            <Message2 className={`${chatActive ? "text-blue-400" : "text-white-400"}`} size="24"
                                variant={chatActive ? "Bulk" : "Outline"} />
                            <p className={`${chatActive ? "text-blue-400" : "text-white-400"}`}>Chat</p>
                        </div>
                    </Link>
                    <Link href={"/events"}>
                        <div className="flex items-center flex-col justify-center cursor-pointer">
                            <GlobalSearch className={`${eventsActive ? "text-blue-400" : "text-white-400"}`} size="24"
                                variant={eventsActive ? "Bulk" : "Outline"} />
                            <p className={`${eventsActive ? "text-blue-400" : "text-white-400"}`}>Events</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}