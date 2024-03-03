import { Home, Message2, EmojiHappy } from "iconsax-react";

export function Navbar({ homeActive, groupsActive, eventsActive }) {
    return (


        <div className="p-4">
            <div className="bg-zinc-900 p-2 text-center rounded-3xl fixed bottom-4 left-4 right-4 ">
                <div className="h-full  flex gap-2 items-center justify-evenly align-center">
                    <div className="flex items-center flex-col justify-center cursor-pointer">
                        <Home className={`${homeActive ? "text-blue-400" : "text-white-400"}`} size="24"
                            variant={homeActive ? "Bulk" : "Outline"} />
                        <p className={`${homeActive ? "text-blue-400" : "text-white-400"}`}>Home</p>
                    </div>

                    <div className="flex items-center flex-col justify-center cursor-pointer">
                        <Message2 className={`${groupsActive ? "text-blue-400" : "text-white-400"}`} size="24"
                            variant={groupsActive ? "Bulk" : "Outline"} />
                        <p className={`${groupsActive ? "text-blue-400" : "text-white-400"}`}>Groups</p>
                    </div>

                    <div className="flex items-center flex-col justify-center cursor-pointer">
                        <EmojiHappy className={`${eventsActive ? "text-blue-400" : "text-white-400"}`} size="24"
                            variant={eventsActive ? "Bulk" : "Outline"} />
                        <p className={`${eventsActive ? "text-blue-400" : "text-white-400"}`}>Events</p>
                    </div>
                </div>
            </div>
        </div>
    )
}