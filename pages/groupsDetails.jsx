import { Navbar } from "@/components/custom/navbar";

export default function GroupsDetails() {
    return (
        <>
            <h1>Group Details</h1>
            <br />
            <br />
            <h1>Lista estilo whatsapp com os grupos em que a pessoa está.</h1>
            <Navbar homeActive={false} groupsActive={false} chatActive={true} eventsActive={false} />
        </>
    )
}