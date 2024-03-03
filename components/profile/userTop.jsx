import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Calendar, MapPin } from "lucide-react"
import { User } from 'iconsax-react'
const userGithub = "ledevmacedod"

export function UserTop() {
    return (
        <div>
            <div className="flex flex-row gap-4 py-6">
                <Avatar className="rounded-2xl h-20 w-20">
                    <AvatarImage src={`https://github.com/${userGithub}.png`} alt="@shadcn" />
                    <AvatarFallback>
                        <User
                            className="opacity-60"
                            size="42"
                            variant="Bold"
                        />
                    </AvatarFallback>

                </Avatar>
                <div>
                    <h1 className="text-xl">Alizasmin Asbolla, 25</h1>
                    <p className="text-sm opacity-70">FrontEnd Developer</p>
                    <div className="flex gap-2 items-center opacity-70">
                        <MapPin size={12} strokeWidth={2} />
                        <h2 className="text-sm">Porto, Portugal</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">

                <p className="text-sm pb-4">Desenvolvedora backend apaixonada por códigos e entusiasta ao ar livre. Amo Programar e criar interfaces lindas.</p>
            </div>
            <div className="flex gap-2 items-center">

            </div>
        </div >
    )
}