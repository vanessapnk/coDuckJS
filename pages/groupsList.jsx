import { GroupItem } from "@/components/custom/groupItem";
import { Navbar } from "@/components/custom/navbar";

export default function GroupsList() {
    return (
        <>
            <GroupItem />
            <Navbar homeActive={false} groupsActive={false} chatActive={true} eventsActive={false} />
        </>
    )
}