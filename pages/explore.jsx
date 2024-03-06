
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "./context/authContext";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



export default function Explore() {
    
    return (

        <>
            <h1>Explore</h1>
            < Tabs defaultValue="account" className="w-[full]" >
                <TabsList>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                <TabsContent value="groups">Make changes to your groups here.</TabsContent>
                <TabsContent value="events">Change your events here.</TabsContent>
            </Tabs >
            <Navbar homeActive={false} groupsActive={false} chatActive={true} eventsActive={false} />
        </>
    )
}