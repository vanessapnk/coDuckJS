"use client"
import { NavInternal } from "@/components/custom/navInternal"
import { UserBody } from "@/components/profile/userBody"
import { UserTop } from "@/components/profile/userTop"

export default function Profile() {
    const userBg = "https://github.com/shadcn.png"
    return (
        <div className="px-4 flex flex-col gap-2">
            <NavInternal backLink={"/"} editLink={"/"} />
            <UserTop />
            <UserBody />
        </div>
    )
}