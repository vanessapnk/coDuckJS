
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "./context/authContext";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { RiEqualizerLine } from "react-icons/ri";



export default function Explore() {
    
    return (

        <>
            <h1>Explore</h1>
            < Tabs defaultValue="account" className="w-[full]" >
                <TabsList>
                    <TabsTrigger value="groups" className="focus:bg-white bg-slate-100">Groups</TabsTrigger>
                    <TabsTrigger value="events" className="focus:bg-white bg-slate-100">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="groups" className="flex justify-center gap-2">
                    
                    <Input type="search" placeholder="Search groups here"/>
                    <RiEqualizerLine size="24" className="text-zinc-500"/>
                </TabsContent>
                <TabsContent value="events">Change your events here.</TabsContent>
            </Tabs >
            <Navbar homeActive={false} groupsActive={false} exploreActive={true} eventsActive={false} />
        </>
    )
}