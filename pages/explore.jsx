import { GroupItem } from "@/components/custom/groupItem";
import { Navbar } from "@/components/custom/navbar";
import { useAuth } from "./context/authContext";
import { useState } from "react";

export default function Explore() {
    const { authenticatedUser } = useAuth();
    const [userData, setUserData] = useState(null);
    return (

        <>
            <GroupItem />
            <Navbar homeActive={false} groupsActive={false} chatActive={true} eventsActive={false} />
        </>
    )
}