import { Navbar } from "@/components/custom/navbar";

export default function Groups() {
    return (
        <>
            <div>
                <h1>Groups</h1>
            </div>

            <Navbar homeActive={false} groupsActive={true} eventsActive={false} />
        </>
    )
}