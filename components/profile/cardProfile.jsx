import { Button } from "@/components/ui/button"
import { ArrowUpRight, MapPin } from "lucide-react"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"
const profileCheck = false

export function CardProfile({ category, profileCheck, profileImage, title, location, description }) {
    return (
        <Card className="p-3">
            <div className="flex flex-col gap-2">
                <div className="flex items-center content-center justify-between">
                    <Badge variant="outline" className="rounded-md">{category}</Badge>
                    <ArrowUpRight className="cursor-pointer" size={24} strokeWidth={2} />
                </div>
                {profileCheck ? <AspectRatio ratio={16 / 9} className="bg-muted">
                    <Image
                        src={`${profileImage}`}
                        alt="Photo by Drew Beamer"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio> : ""}

                <h1 className="text-base"> {title} </h1>
                <div className="flex gap-2 items-center opacity-70">
                    <MapPin size={12} strokeWidth={2} />
                    <h2 className="text-sm"> {location} </h2>
                </div>
                <p className="text-sm">
                    {description}
                </p>
            </div>
        </Card>
    )
}